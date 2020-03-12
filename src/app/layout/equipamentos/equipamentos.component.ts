import { Component, ViewChild, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { OrganizeRoomsService, SessionStorageService, EquipamentoService } from '../../shared/_services';
import { Equipamento } from 'src/app/shared/_models';
import { configurarPaginador } from 'src/app/shared/utils/table-data';

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
        private equipamentoService: EquipamentoService
    ) { }

    ngOnInit() {
        this.carregarDados();
        this.configurarPaginador();

        this.permissao = this.sessionStorageService.getValue().pessoa.pesPermissao;
    }

    carregarDados() {
        this.equipamentoService.buscarTodos().subscribe(ret => {
            this.tableData.data = ret.data;
        });
    }

    editarEquipamento(registro: Equipamento) {
        this.organizeRoomsService.setValue(registro);
    }

    excluir(equipamento: Equipamento) {
        let retorno: boolean;
        this.equipamentoService.deletar(equipamento.equId).subscribe(ret => {
            retorno = ret.data;
        });

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
        this.paginator = configurarPaginador(this.paginator);

        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;
    }
}