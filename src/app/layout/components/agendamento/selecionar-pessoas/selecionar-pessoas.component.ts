import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup } from '@angular/forms';
import { ConfSelectionModel } from 'src/app/shared/utils';
import { PessoaService } from 'src/app/shared';
import { Pessoa } from 'src/app/shared/_models';

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
    confSelectionModelPessoa: ConfSelectionModel<Pessoa>;
    activeModal: NgbActiveModal;

    constructor(private pessoaService: PessoaService) { }

    ngOnInit() {
        this.confSelectionModelPessoa = new ConfSelectionModel<Pessoa>(this.selecionados, this.listPessoas);
        this.carregarPessoas();
    }

    ngOnDestroy() {
        this.fechar();
    }

    carregarPessoas() {
        this.pessoaService.buscarTodos().subscribe(ret => {
            this.listPessoas.data = ret.data;
        });
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
