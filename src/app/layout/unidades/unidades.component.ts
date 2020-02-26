import { Component, ViewChild, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { rangeLabel } from '../../shared/utils/range-label';

import { UnidadeService, OrganizeRoomsService, SessionStorageService } from 'src/app/shared/_services';
import { Unidade, LocalUser } from 'src/app/shared/_models';
import { Router, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-unidades',
    templateUrl: './unidades.component.html',
    styleUrls: ['./unidades.component.scss'],
    animations: [routerTransition()]
})
export class UnidadesComponent implements OnInit {

    private router: Router
    // Services
    private _unidadeService: UnidadeService;
    private _organizeRoomsService = new OrganizeRoomsService
    //
    private _localUser = SessionStorageService.getSessionUser();

    private displayedColumns: string[] = ['uniId', 'uniNome', 'uniAtiva', 'detalhes'];
    private tableData = new MatTableDataSource<any>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor() { }

    ngOnInit() {
        this.carregarUnidades();
        this.configurarPaginador();
    }

    carregarUnidades() {
        this._unidadeService.buscarTodasUnidades().subscribe(ret => {
            this.tableData.data = ret.data;
            this.tableData.paginator = this.paginator;
            this.tableData.sort = this.sort;
        });
    }

    editarUnidade(registro: Unidade) {

        let navigationExtras: NavigationExtras = {
            state: {
                unidade: registro
            }
        };
        this.router.navigate(['/unidades-adicionar'], navigationExtras);

        this._organizeRoomsService.setValue(registro);
    }

    excluir(unidade: Unidade) {
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