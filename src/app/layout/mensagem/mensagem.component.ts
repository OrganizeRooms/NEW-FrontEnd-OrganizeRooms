import { Component, ViewChild, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { OrganizeRoomsService, SessionStorageService, MensagemService } from 'src/app/shared/_services';
import { Unidade, Mensagem } from 'src/app/shared/_models';
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

    listaMensagens: Mensagem[];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private OrganizeRoomsService: OrganizeRoomsService<Unidade>,
        private sessionStorageService: SessionStorageService,
        private mensagemService: MensagemService
    ) { }

    ngOnInit() {
        this.carregarDados();
    }

    carregarDados() {
        this.mensagemService.buscarTodos().subscribe(ret => {
            this.listaMensagens = ret.data;
        })
    }

    editar(registro: Unidade) {

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