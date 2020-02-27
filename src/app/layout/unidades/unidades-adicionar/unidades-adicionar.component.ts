import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Unidade, UnidadeService, OrganizeRoomsService, SessionStorageService } from 'src/app/shared/';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-unidades-adicionar',
    templateUrl: './unidades-adicionar.component.html',
    styleUrls: ['./unidades-adicionar.component.scss'],
    animations: [routerTransition()],
})

export class UnidadesAdicionarComponent implements OnInit, OnDestroy {

    private _formBuilder: FormBuilder;

    _labelPosition = 'before';
    localUser = SessionStorageService.getSessionUser();
    permissao = this.localUser.pessoa.pesPermissao

    selUnidade: Unidade;
    selUnidade2: Unidade; // teste
    formAddUnidade: FormGroup;

    constructor(
        private ActivatedRoute: ActivatedRoute,
        private router: Router,
        private UnidadeService: UnidadeService,
        private OrganizeRoomsService: OrganizeRoomsService
    ) { }

    ngOnInit() {

        this.selUnidade = this.OrganizeRoomsService.getValue()

        this.ActivatedRoute.queryParams.subscribe(() => {
            let getNav = this.router.getCurrentNavigation();
            if (getNav.extras.state) {
                this.selUnidade2 = getNav.extras.state.unidade;
            }
        });

        console.log('this.selUnidade2 = ' + this.selUnidade2)

        this.criarFormulario();
    }

    ngOnDestroy() {
        this.OrganizeRoomsService.setValue(null)
    }

    criarFormulario() {
        if (this.selUnidade != null) {
            this.formAddUnidade = this._formBuilder.group({
                uniId: [this.selUnidade.uniId],
                uniNome: [this.selUnidade.uniNome, Validators.compose([Validators.required])],
                uniAtiva: [this.selUnidade.uniAtiva],
                uniDtCadastro: [this.selUnidade.uniDtCadastro]
            });
        } else {
            this.formAddUnidade = this._formBuilder.group({
                uniId: [0],
                uniNome: [null, Validators.compose([Validators.required])],
                uniAtiva: [true],
                uniDtCadastro: [new Date()]
            });
        }
    }

    adicionarUnidade() {

        var uniPesCadastro;
        if (this.selUnidade != null) {
            uniPesCadastro = null
        } else {
            uniPesCadastro = this.localUser.pessoa.pesId
        }

        const unidade: Unidade = {
            uniId: this.formAddUnidade.value.uniId,
            uniNome: this.formAddUnidade.value.uniNome,
            uniAtiva: this.formAddUnidade.value.uniAtiva,
            uniPesAtualizacao: this.localUser.pessoa.pesId,
            uniDtAtualizacao: new Date(),
            uniPesCadastro: uniPesCadastro,
            // NÃO É ATUALIZADO 
            uniDtCadastro: null,
        };

        this.UnidadeService.adicionarAtualizarUnidade(unidade).subscribe(ret => {
            if (ret.data != null) {
                if (this.selUnidade == null) {
                    alert('Unidade ' + ret.data.uniNome + ' Adicionada com Sucesso!');
                    this.router.navigate(['/unidades']);
                } else {
                    alert('Unidade ' + ret.data.uniNome + ' Atualizada com Sucesso!');
                    this.router.navigate(['/unidades']);
                }
            }
        });
    }

    excluir() {
        this.UnidadeService.deletarUnidade(this.selUnidade.uniId.toString()).subscribe(ret => {
            console.log(ret.data)
            if (ret.data == true) {
                alert('Unidade ' + this.selUnidade.uniNome + ' Deletada com Sucesso!');
                this.router.navigate(['/unidades']);
            }
            if (ret.data == false) {
                alert('Não foi possível Deletar a Unidade ' + this.selUnidade.uniNome + ' !');
            }
        })
    }
}
