import { Component, ViewChild, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { OrganizeRoomsService, SessionStorageService, PessoaService } from '../../shared/_services';
import { Pessoa } from 'src/app/shared/_models';
import { configurarPaginador } from 'src/app/shared/utils/table-data';

@Component({
    selector: 'app-pessoas',
    templateUrl: './pessoas.component.html',
    styleUrls: ['./pessoas.component.scss'],
    animations: [routerTransition()]
})
export class PessoasComponent implements OnInit {

    permissao: string;
    listPessoas: Pessoa[];
    displayedColumns = ['pesId', 'pesNome', 'pesDescricaoPermissao', 'pesUnidade', 'detalhes'];
    tableData = new MatTableDataSource<Pessoa>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private organizeRoomsService: OrganizeRoomsService<Pessoa>,
        private sessionStorageService: SessionStorageService,
        private pessoaService: PessoaService
    ) { }

    ngOnInit() {
        this.carregarDados();
        this.configurarPaginador();

        this.permissao = this.sessionStorageService.getValue().pessoa.pesPermissao;
    }

    carregarDados() {
        this.pessoaService.buscarTodos().subscribe(ret => {
            this.tableData.data = ret.data;
        });
    }

    editar(registro: Pessoa) {
        this.organizeRoomsService.setValue(registro);
    }

    excluir(pessoa: Pessoa) {

        let retorno: boolean;
        this.pessoaService.deletar(pessoa.pesId).subscribe(ret => {
            retorno = ret.data;
        });
        
        if (retorno) {
            alert(`Pessoa ${pessoa.pesNome} Deletada com Sucesso!`);
            location.reload();

        } else {
            alert(`Não foi possível Deletar a Pessoa ${pessoa.pesNome} !`);
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