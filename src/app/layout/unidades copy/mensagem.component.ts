import { Component, ViewChild, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { OrganizeRoomsService, SessionStorageService, UnidadeService } from 'src/app/shared/_services';
import { Unidade } from 'src/app/shared/_models';
import { configurarPaginador } from 'src/app/shared/utils/table-data';


@Component({
    selector: 'app-mensagem',
    templateUrl: './mensagem.component.html',
    styleUrls: ['./mensagem.component.scss'],
    animations: [routerTransition()]
})
export class MensagemComponent implements OnInit {

    permissao: string;
    displayedColumns: string[] = ['uniId', 'uniNome', 'uniAtiva', 'detalhes'];
    tableData = new MatTableDataSource<Unidade>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
    ) { }

    ngOnInit() {

    }

    carregarDados() {
        
    }

    editar(registro: Unidade) {
        
    }

    excluir(unidade: Unidade) {

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