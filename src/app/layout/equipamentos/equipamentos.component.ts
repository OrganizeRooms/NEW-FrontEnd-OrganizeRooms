import { Component, ViewChild, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { rangeLabel } from '../../shared/utils/range-label';

import { OrganizeRoomsService, SessionStorageService } from '../../shared/_services';
import { Equipamento } from 'src/app/shared/_models';
import { EquipamentoController } from 'src/app/shared/_controllers';

@Component({
    selector: 'app-equipamentos',
    templateUrl: './equipamentos.component.html',
    styleUrls: ['./equipamentos.component.scss'],
    animations: [routerTransition()]
})
export class EquipamentosComponent implements OnInit {

    permissao: string;
    listEquipamentos: Equipamento[];
    displayedColumns = ['equId', 'equNome', 'equUnidade', 'equAtiva', 'detalhes'];
    tableData = new MatTableDataSource<Equipamento>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private organizeRoomsService: OrganizeRoomsService<Equipamento>,
        private sessionStorageService: SessionStorageService,
        private equipamentoController: EquipamentoController
    ) { }

    ngOnInit() {
        this.carregarDados();
        this.configurarPaginador();

        this.permissao = this.sessionStorageService.getValue().pessoa.pesPermissao;
    }

    async carregarDados() {
        this.tableData.data = await this.equipamentoController.buscarTodos();
    }

    editarEquipamento(registro: Equipamento) {
        this.organizeRoomsService.setValue(registro);
    }

    excluir(equipamento: Equipamento) {
        let retorno = this.equipamentoController.deletar(equipamento.equId);
        console.log(retorno);

        if (retorno) {
            alert(`Equipamento ${equipamento.equNome} Deletada com Sucesso!`);
            location.reload()
        } else {
            alert(`Não foi possível Deletar a Equipamento ${equipamento.equNome}!`);
        }
    }

    aplicarFiltro(valor: string) {
        this.tableData.filter = valor.trim().toLowerCase();
    }

    configurarPaginador() {
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;

        this.paginator._intl.itemsPerPageLabel = 'Itens por Página';
        this.paginator._intl.getRangeLabel = rangeLabel;
        this.paginator.showFirstLastButtons = true;
        this.paginator.pageSizeOptions = [8, 10, 15, 20, 30];
    }
}