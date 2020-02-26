import { Component, ViewChild, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { rangeLabel } from 'src/app/shared/utils/range-label';

import { UnidadeService, OrganizeRoomsService, SessionStorageService } from 'src/app/shared/_services';
import { Unidade, LocalUser } from 'src/app/shared/_models';
import { Router, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-table-data',
    templateUrl: './table-data.component.html',
    styleUrls: ['./table-data.component.scss'],
    animations: [routerTransition()]
})
export class TableDataComponent<T, S> implements OnInit {

    private router: Router
    // Services
    private _service: S;
    private _organizeRoomsService = new OrganizeRoomsService
    //
    private _localUser = SessionStorageService.getSessionUser();

    private tableData = new MatTableDataSource<T>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private displayedColumns: string[],) { }

    ngOnInit() {
        this.carregarUnidades();
        this.configurarPaginador();
    }

    carregarUnidades() {
        this._service.buscarTodasUnidades().subscribe(ret => {
            this.tableData.data = ret.data;
            this.tableData.paginator = this.paginator;
            this.tableData.sort = this.sort;
        });
    }

    editarUnidade(registro: T) {

        let navigationExtras: NavigationExtras = {
            state: {
                unidade: registro
            }
        };
        this.router.navigate(['/unidades-adicionar'], navigationExtras);

        this._organizeRoomsService.setValue(registro);
    }

    excluir(unidade: T) {
        this._unidadeService.deletarUnidade(unidade.uniId.toString()).subscribe(ret => {
            if (ret.data == true) {
                alert('Unidade ' + unidade.uniNome + ' Deletada com Sucesso!');
                location.reload();
            };
            if (ret.data == false) {
                alert('Não foi possível Deletar a Unidade ' + unidade.uniNome + ' !');
            };
        });
    }

    aplicarFiltro(valor: string) {
        this.tableData.filter = valor.trim().toLowerCase();
    }

    configurarPaginador() {
        this.paginator._intl.itemsPerPageLabel = 'Itens por Página';
        this.paginator._intl.getRangeLabel = rangeLabel;
        this.paginator.showFirstLastButtons = true;
        this.paginator.pageSizeOptions = [8, 10, 15, 20, 30];
    }
}