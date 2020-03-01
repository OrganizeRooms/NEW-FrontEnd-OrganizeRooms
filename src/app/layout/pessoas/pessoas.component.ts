import { Component, ViewChild, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { rangeLabel } from '../../shared/utils/range-label';

import { PessoaService, OrganizeRoomsService, SessionStorageService } from '../../shared/_services';

@Component({
    selector: 'app-pessoas',
    templateUrl: './pessoas.component.html',
    styleUrls: ['./pessoas.component.scss'],
    animations: [routerTransition()]
})
export class PessoasComponent implements OnInit {
    permissao;
    listPessoas;

    displayedColumns: string[] = ['pesId', 'pesNome', 'pesDescricaoPermissao', 'pesUnidade', 'detalhes'];
    tableData = new MatTableDataSource<any>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private PessoaService: PessoaService,
        private organizeRoomsService: OrganizeRoomsService,
        
    ) { }

    ngOnInit() {
        this.carregarPessoas();
        this.configurarPaginador();

        this.permissao = SessionStorageService.getSessionUser().pessoa.pesPermissao;
    }

    carregarPessoas() {
        this.PessoaService.buscarTodasPessoas().subscribe(ret => {
            this.tableData.data = ret.data;
            this.tableData.paginator = this.paginator;
            this.tableData.sort = this.sort;
        });
    }

    editarPessoa(registro) {
        this.organizeRoomsService.setValue(registro);
    }

    excluir(pessoa) {
        this.PessoaService.deletar(pessoa.pesId).subscribe(ret => {
            if (ret.data == true) {
                alert('Pessoa ' + pessoa.pesNome + ' Deletada com Sucesso!');
                location.reload()
            }
            if (ret.data == false) {
                alert('Não foi possível Deletar a Pessoa ' + pessoa.pesNome + ' !');
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