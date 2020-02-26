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

    private _activatedRoute: ActivatedRoute;
    private _router: Router;
    // Services
    private _formBuilder: FormBuilder;
    private _unidadeService: UnidadeService;
    private _organizeRoomsService = new OrganizeRoomsService<Unidade>()
    //

    private _labelPosition = 'before';
    private _localUser = SessionStorageService.getSessionUser();

    private _selUnidade: Unidade;
    private _selUnidade2: Unidade; // teste
    private _formAddUnidade: FormGroup;

    constructor() { }

    ngOnInit() {

        this._selUnidade = this._organizeRoomsService.getValue()

        this._activatedRoute.queryParams.subscribe(() => {
            let getNav = this._router.getCurrentNavigation();
            if (getNav.extras.state) {
                this._selUnidade2 = getNav.extras.state.unidade;
            }
        });

        console.log('this._selUnidade2 = ' + this._selUnidade2)

        this.criarFormulario();
    }

    ngOnDestroy() {
        this._organizeRoomsService.setValue(null)
    }

    criarFormulario() {
        if (this._selUnidade != null) {
            this._formAddUnidade = this._formBuilder.group({
                uniId: [this._selUnidade.uniId],
                uniNome: [this._selUnidade.uniNome, Validators.compose([Validators.required])],
                uniAtiva: [this._selUnidade.uniAtiva],
                uniDtCadastro: [this._selUnidade.uniDtCadastro]
            });
        } else {
            this._formAddUnidade = this._formBuilder.group({
                uniId: [0],
                uniNome: [null, Validators.compose([Validators.required])],
                uniAtiva: [true],
                uniDtCadastro: [new Date()]
            });
        }
    }

    adicionarUnidade() {

        var uniPesCadastro;
        if (this._selUnidade != null) {
            uniPesCadastro = null
        } else {
            uniPesCadastro = this._localUser.pessoa.pesId
        }

        const unidade: Unidade = {
            uniId: this._formAddUnidade.value.uniId,
            uniNome: this._formAddUnidade.value.uniNome,
            uniAtiva: this._formAddUnidade.value.uniAtiva,
            uniPesAtualizacao: this._localUser.pessoa.pesId,
            uniDtAtualizacao: new Date(),
            uniPesCadastro: uniPesCadastro,
            // NÃO É ATUALIZADO 
            uniDtCadastro: null,
        };

        this._unidadeService.adicionarAtualizarUnidade(unidade).subscribe(ret => {
            if (ret.data != null) {
                if (this._selUnidade == null) {
                    alert('Unidade ' + ret.data.uniNome + ' Adicionada com Sucesso!');
                    this._router.navigate(['/unidades']);
                } else {
                    alert('Unidade ' + ret.data.uniNome + ' Atualizada com Sucesso!');
                    this._router.navigate(['/unidades']);
                }
            }
        });
    }

    excluir() {
        this._unidadeService.deletarUnidade(this._selUnidade.uniId.toString()).subscribe(ret => {
            console.log(ret.data)
            if (ret.data == true) {
                alert('Unidade ' + this._selUnidade.uniNome + ' Deletada com Sucesso!');
                this._router.navigate(['/unidades']);
            }
            if (ret.data == false) {
                alert('Não foi possível Deletar a Unidade ' + this._selUnidade.uniNome + ' !');
            }
        })
    }
}
