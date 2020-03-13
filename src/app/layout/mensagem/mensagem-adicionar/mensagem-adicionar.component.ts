import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OrganizeRoomsService, SessionStorageService, UnidadeService } from 'src/app/shared/_services';
import { Unidade, LocalUser } from 'src/app/shared/_models';

@Component({
    selector: 'app-mensagem-adicionar',
    templateUrl: './mensagem-adicionar.component.html',
    styleUrls: ['./mensagem-adicionar.component.scss'],
    animations: [routerTransition()],
})

export class MensagemAdicionarComponent implements OnInit, OnDestroy {

    labelPosition = 'before';
    localUser: LocalUser;
    permissao: string;
    selUnidade: Unidade;
    formAddUnidade: FormGroup;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private organizeRoomsService: OrganizeRoomsService<Unidade>,
        private sessionStorageService: SessionStorageService,
    ) { }

    ngOnInit() {
        this.selUnidade = this.organizeRoomsService.getValue();
        this.localUser = this.sessionStorageService.getValue();
        this.permissao = this.localUser.pessoa.pesPermissao;

        this.criarFormulario();
    }

    ngOnDestroy() {
        this.organizeRoomsService.setValue(null);
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

    adicionar() {

        const unidade = this.montarUnidade();

        let retorno: Unidade;
        /*this.unidadeService.adicionar(unidade).subscribe(ret => {
            retorno = ret.data;
        });

        if (retorno) {

            if (this.selUnidade == null) {
                alert(`Unidade ${retorno.uniNome} Adicionada com Sucesso!`);

            } else {
                alert(`Unidade ${retorno.uniNome} Atualizada com Sucesso!`);
            }

            this.router.navigate(['/unidades']);
        }*/
    }

    montarUnidade(): Unidade {

        return {
            uniId: this.formAddUnidade.value.uniId,
            uniNome: this.formAddUnidade.value.uniNome,
            uniAtiva: this.formAddUnidade.value.uniAtiva,
            uniPesAtualizacao: this.localUser.pessoa.pesId,
            uniDtAtualizacao: new Date(),
            uniPesCadastro: this.selUnidade == null ? this.localUser.pessoa.pesId : this.selUnidade.uniPesCadastro,
            uniDtCadastro: new Date(),
        };
    }

    excluir() {

        /*let retorno: boolean;
        this.unidadeService.deletar(this.selUnidade.uniId).subscribe(ret => {
            retorno = ret.data;
        });

        if (retorno) {
            alert(`Unidade ${this.selUnidade.uniNome} Deletada com Sucesso!`);
            this.router.navigate(['/unidades']);

        } else {
            alert(`Não foi possível Deletar a Unidade ${this.selUnidade.uniNome}!`);
        }*/
    }
}
