import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PessoaController, Pessoa, ConfSelectionModel } from 'src/app/shared';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-selecionar-pessoas',
    templateUrl: './selecionar-pessoas.component.html'
})
export class SelecionarPessoasComponent implements OnInit, OnDestroy {

    @Output() pessoasSelecionadas = new EventEmitter<Pessoa[]>();

    displayedColumns = ['selecionar', 'pesNome', 'pesUnidade', 'obrigatorio'];
    listPessoas = new MatTableDataSource<Pessoa>();
    selecionados = new SelectionModel<Pessoa>(true, []);
    filtrosModalPartic: FormGroup;
    confSelectionModelPessoa = new ConfSelectionModel<Pessoa>(this.selecionados, this.listPessoas);

    constructor(
        private activeModal: NgbActiveModal,
        private pessoaController: PessoaController
    ) { }

    ngOnInit() {
        this.carregarPessoas();
    }

    ngOnDestroy() {
        this.fechar();
    }

    async carregarPessoas() {
        this.listPessoas.data = await this.pessoaController.buscarTodos();
    }

    fechar() {
        this.activeModal.close(this.selecionados);
    }

    aplicarFiltro(valor: string) {
        this.listPessoas.filter = valor.trim().toLowerCase();
    }

    isAllSelected(): boolean {
        return this.confSelectionModelPessoa.isAllSelected();
    }

    masterToggle(): void {
        this.confSelectionModelPessoa.masterToggle();
    }

    checkboxLabel(row?: any): string {
        return this.confSelectionModelPessoa.checkboxLabel(row);
    }
}
