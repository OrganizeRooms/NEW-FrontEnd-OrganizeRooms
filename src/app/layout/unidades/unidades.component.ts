import { Component, ViewChild, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { OrganizeRoomsService, SessionStorageService, UnidadeService } from 'src/app/shared/_services';
import { Unidade } from 'src/app/shared/_models';
import { configurarPaginador } from 'src/app/shared/utils/table-data';


@Component({
    selector: 'app-unidades',
    templateUrl: './unidades.component.html',
    styleUrls: ['./unidades.component.scss'],
    animations: [routerTransition()]
})
export class UnidadesComponent implements OnInit {

    permissao: string;
    displayedColumns: string[] = ['uniId', 'uniNome', 'uniAtiva', 'detalhes'];
    tableData = new MatTableDataSource<Unidade>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private OrganizeRoomsService: OrganizeRoomsService<Unidade>,
        private sessionStorageService: SessionStorageService,
        private unidadeService: UnidadeService
    ) { }

    ngOnInit() {
        this.permissao = this.sessionStorageService.getValue().pessoa.pesPermissao;

        this.carregarDados();
        this.configurarPaginador();
    }

    carregarDados() {
        this.unidadeService.buscarTodos().subscribe(ret => {
            this.tableData.data = ret.data;
        });
    }

    editar(registro: Unidade) {
        this.OrganizeRoomsService.setValue(registro);
    }

    excluir(unidade: Unidade) {

        let retorno: boolean;
        this.unidadeService.deletar(unidade.uniId).subscribe(ret => {
            retorno = ret.data;
        });

        if (retorno) {
            alert(`Unidade ${unidade.uniNome} Deletada com Sucesso!`);
            location.reload();
        } else {
            alert(`Não foi possível Deletar a Unidade ${unidade.uniNome}!`);
        };
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