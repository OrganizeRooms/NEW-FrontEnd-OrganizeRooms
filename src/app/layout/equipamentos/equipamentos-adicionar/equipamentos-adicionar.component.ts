import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OrganizeRoomsService, SessionStorageService } from 'src/app/shared/_services';
import { Equipamento, Unidade } from 'src/app/shared/_models';
import { UnidadeController, EquipamentoController } from 'src/app/shared/_controllers';

@Component({
    selector: 'app-equipamentos-adicionar',
    templateUrl: './equipamentos-adicionar.component.html',
    styleUrls: ['./equipamentos-adicionar.component.scss'],
    animations: [routerTransition()]
})

export class EquipamentosAdicionarComponent implements OnInit, OnDestroy {

    labelPosition = 'before';
    permissao: string;
    formAddEquipamento: FormGroup;
    listUnidades: Unidade[];
    selEquipamento: Equipamento;
    selUnidade = new FormControl();

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private organizeRoomsService: OrganizeRoomsService<Equipamento>,
        private sessionStorageService: SessionStorageService,
        private equipamentoController: EquipamentoController,
        private unidadeController: UnidadeController
    ) { }

    ngOnInit() {
        this.selEquipamento = this.organizeRoomsService.getValue();
        this.permissao = this.sessionStorageService.getValue().pessoa.pesPermissao;

        this.carregarUnidades();
        this.criarFormulario();
    }

    ngOnDestroy() {
        this.organizeRoomsService.setValue(null)
    }

    async carregarUnidades() {
        this.listUnidades = await this.unidadeController.buscarAtivas();
    }

    criarFormulario() {
        if (this.selEquipamento != null) {
            this.formAddEquipamento = this.formBuilder.group({
                equId: [this.selEquipamento.equId],
                equNome: [this.selEquipamento.equNome, Validators.compose([Validators.required])],
                equDescricao: [this.selEquipamento.equDescricao, Validators.compose([Validators.required])],
                equAtiva: [this.selEquipamento.equAtiva],
                equDtCadastro: [this.selEquipamento.equDtCadastro]
            });
            this.selUnidade = new FormControl(this.selEquipamento.equUnidade.uniId)

        } else {
            this.formAddEquipamento = this.formBuilder.group({
                equId: [0],
                equNome: [null, Validators.compose([Validators.required])],
                equDescricao: [null, Validators.compose([Validators.required])],
                equAtiva: [true],
                equDtCadastro: [new Date()]
            });
            this.selUnidade = new FormControl(this.sessionStorageService.getValue().pessoa.pesUnidade.uniId)
        }
    }

    async adicionarEquipamento() {

        var equPesCadastro;
        if (this.selEquipamento != null) {
            equPesCadastro = null
        } else {
            equPesCadastro = this.sessionStorageService.getValue().pessoa.pesId
        }

        const unidade: Unidade = {
            uniId: this.selUnidade.value,
            uniNome: null,
            uniAtiva: null,
            uniPesCadastro: null,
            uniDtCadastro: null,
            uniPesAtualizacao: null,
            uniDtAtualizacao: null
        };

        const equipamento: Equipamento = {
            equId: this.formAddEquipamento.value.equId,
            equNome: this.formAddEquipamento.value.equNome,
            equDescricao: this.formAddEquipamento.value.equDescricao,
            equAtiva: this.formAddEquipamento.value.equAtiva,
            equUnidade: unidade,
            equPesAtualizacao: this.sessionStorageService.getValue().pessoa.pesId,
            equDtAtualizacao: new Date(),
            // NÃO É ATUALIZADO 
            equPesCadastro: equPesCadastro,
            equDtCadastro: null,
        };

        let retEquipamento = await this.equipamentoController.adicionar(equipamento);

        if (retEquipamento != null) {
            if (this.selEquipamento != null) {
                alert(`Equipamento ${retEquipamento.equNome} Atualizada com Sucesso!`);
            } else {
                alert(`Equipamento ${retEquipamento.equNome} Adicionada com Sucesso!`);

            }
            this.router.navigate(['/equipamentos']);
        }
    }

    excluir() {
        let retorno = this.equipamentoController.deletar(this.selEquipamento.equId);

        if (retorno) {
            alert(`Equipamento ${this.selEquipamento.equNome} Deletada com Sucesso!`);
            location.reload()
        } else {
            alert(`Não foi possível Deletar a Equipamento ${this.selEquipamento.equNome}!`);
        }
    }
}
