import { Component, ViewChild, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { rangeLabel } from '../../shared/utils/range-label';
import { OrganizeRoomsService, SessionStorageService } from 'src/app/shared/_services';
import { Unidade } from 'src/app/shared/_models';
import { UnidadeController } from 'src/app/shared/_controllers';


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
        private unidadeController: UnidadeController
    ) { }

    ngOnInit() {
        this.permissao = this.sessionStorageService.getValue().pessoa.pesPermissao;

        this.carregarDados();
        this.configurarPaginador();
    }

    async carregarDados() {
        this.tableData.data = await this.unidadeController.buscarTodos();
    }

    editar(registro: Unidade) {
        this.OrganizeRoomsService.setValue(registro);
    }

    excluir(unidade: Unidade) {
        let retorno = this.unidadeController.deletar(unidade.uniId);

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
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;

        this.paginator._intl.itemsPerPageLabel = 'Itens por Página';
        this.paginator._intl.getRangeLabel = rangeLabel;
        this.paginator.showFirstLastButtons = true;
        this.paginator.pageSizeOptions = [8, 10, 15, 20, 30];
    }
}