import { Component, ViewChild, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { configurarPaginador } from 'src/app/shared/utils/table-data';
import { OrganizeRoomsService, SessionStorageService, SalaService } from '../../shared/_services';
import { Sala } from 'src/app/shared/_models';

@Component({
    selector: 'app-salas',
    templateUrl: './salas.component.html',
    styleUrls: ['./salas.component.scss'],
    animations: [routerTransition()]
})
export class SalasComponent implements OnInit {

    permissao: string;
    listSalas: Sala[];
    displayedColumns = ['salaNome', 'salaUnidade', 'salaLotacao', 'salaAtiva', 'detalhes'];
    tableData = new MatTableDataSource<Sala>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private organizeRoomsService: OrganizeRoomsService<Sala>,
        private sessionStorageService: SessionStorageService,
        private salaService: SalaService
    ) { }

    ngOnInit() {
        this.permissao = this.sessionStorageService.getValue().pessoa.pesPermissao;

        this.carregarDados();
        this.configurarPaginador();
    }

    carregarDados() {

        this.salaService.buscarTodos().subscribe(ret => {
            this.tableData.data = ret.data;
        });
    }

    editar(registro: Sala) {
        this.organizeRoomsService.setValue(registro);
    }

    excluir(sala: Sala) {

        let retorno: boolean;
        this.salaService.deletar(sala.salaId).subscribe(ret => {
            retorno = ret.data;
        });

        if (retorno) {
            alert(`${sala.salaNome} Deletada com Sucesso!`);
            location.reload();

        } else {
            alert(`Não foi possível Deletar ${sala.salaNome}!`);
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