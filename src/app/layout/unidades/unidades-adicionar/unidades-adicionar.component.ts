import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Unidade, UnidadeService, OrganizeRoomsService, SessionStorageService, LocalUser } from 'src/app/shared/';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-unidades-adicionar',
    templateUrl: './unidades-adicionar.component.html',
    styleUrls: ['./unidades-adicionar.component.scss'],
    animations: [routerTransition()],
})

export class UnidadesAdicionarComponent implements OnInit, OnDestroy {

    labelPosition = 'before';
    localUser: LocalUser;
    permissao: string;

    selUnidade: Unidade;
    formAddUnidade: FormGroup;

    constructor(
        private router: Router,
        private UnidadeService: UnidadeService,
        private OrganizeRoomsService: OrganizeRoomsService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.localUser = SessionStorageService.getSessionUser();
        this.permissao = this.localUser.pessoa.pesPermissao;

        this.selUnidade = this.OrganizeRoomsService.getValue()
        this.criarFormulario();
    }

    ngOnDestroy() {
        this.OrganizeRoomsService.setValue(null)
    }

    criarFormulario() {
        if (this.selUnidade != null) {
            this.formAddUnidade = this.formBuilder.group({
                uniId: [this.selUnidade.uniId],
                uniNome: [this.selUnidade.uniNome, Validators.compose([Validators.required])],
                uniAtiva: [this.selUnidade.uniAtiva],
                uniDtCadastro: [this.selUnidade.uniDtCadastro]
            });
        } else {
            this.formAddUnidade = this.formBuilder.group({
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
