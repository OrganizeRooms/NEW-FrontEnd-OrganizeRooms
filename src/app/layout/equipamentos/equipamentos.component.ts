import { Component, ViewChild, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { rangeLabel } from '../../shared/utils/range-label';

import { EquipamentoService, OrganizeRoomsService, SessionStorageService } from '../../shared/_services';
import { Equipamento } from 'src/app/shared';

@Component({
    selector: 'app-equipamentos',
    templateUrl: './equipamentos.component.html',
    styleUrls: ['./equipamentos.component.scss'],
    animations: [routerTransition()]
})
export class EquipamentosComponent implements OnInit {
    
    localUser = SessionStorageService.getSessionUser();
    permissao: string;

    listEquipamentos: Equipamento[];

    displayedColumns: string[] = ['equId', 'equNome', 'equUnidade', 'equAtiva', 'detalhes'];
    tableData = new MatTableDataSource<Equipamento>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private equipamentoService: EquipamentoService,
        private organizeRoomsService: OrganizeRoomsService<Equipamento>,
        
    ) { }

    ngOnInit() {
        this.carregarEquipamentos();
        this.configurarPaginador();

        this.permissao = this.localUser.pessoa.pesPermissao;
    }

    carregarEquipamentos() {
        this.equipamentoService.buscarTodos().subscribe(ret => {
            this.tableData.data = ret.data;
            this.tableData.paginator = this.paginator;
            this.tableData.sort = this.sort;
        });
    }

    editarEquipamento(registro: Equipamento) {
        this.organizeRoomsService.setValue(registro);
    }

    excluir(equipamento: Equipamento) {
        this.equipamentoService.deletar(equipamento.equId.toString()).subscribe(ret => {
            if (ret.data == true) {
                alert('Equipamento ' + equipamento.equNome + ' Deletada com Sucesso!');
                location.reload()
            }
            if (ret.data == false) {
                alert('Não foi possível Deletar a Equipamento ' + equipamento.equNome + ' !');
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