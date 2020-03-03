import { Component, ViewChild, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { rangeLabel } from '../../shared/utils/range-label';

import { SalaService, OrganizeRoomsService, StorageService, SessionStorageService } from '../../shared/_services';
import { Sala } from 'src/app/shared';

@Component({
    selector: 'app-salas',
    templateUrl: './salas.component.html',
    styleUrls: ['./salas.component.scss'],
    animations: [routerTransition()]
})
export class SalasComponent implements OnInit {
    permissao;

    listSalas;

    displayedColumns: string[] = ['salaNome', 'salaUnidade', 'salaLotacao', 'salaAtiva', 'detalhes'];
    tableData = new MatTableDataSource<any>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private salaService: SalaService,
        private organizeRoomsService: OrganizeRoomsService<Sala>,
        private sessionStorageService: SessionStorageService
    ) { }

    ngOnInit() {
        this.carregarSalas();
        this.configurarPaginador();

        this.permissao = this.sessionStorageService.getValue().pessoa.pesPermissao;
    }

    carregarSalas() {
        this.salaService.buscarTodos().subscribe(ret => {
            this.tableData.data = ret.data;
            this.tableData.paginator = this.paginator;
            this.tableData.sort = this.sort;
        });
    }

    editarSala(registro) {
        this.organizeRoomsService.setValue(registro);
    }

    excluir(sala) {
        this.salaService.deletar(sala.salaId).subscribe(ret => {
            if (ret.data == true) {
                alert(sala.salaNome + ' Deletada com Sucesso!');
                location.reload()
            }
            if (ret.data == false) {
                alert('Não foi possível Deletar ' + sala.salaNome + ' !');
            }
        })
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