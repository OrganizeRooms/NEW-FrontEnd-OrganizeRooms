import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NgbDateStruct, NgbDatepickerI18n, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter, CustomDatepickerI18n, I18n } from 'src/app/shared/utils/datepicker';
import { AgendamentoContext, Unidade, Pessoa } from 'src/app/shared/_models';
import { DateHelper, } from 'src/app/shared/_helpers';
import { AgendamentoController } from 'src/app/shared/_controllers';
import { configurarPaginador } from 'src/app/shared/utils/table-data';

@Component({
    selector: 'app-agendamentos',
    templateUrl: './agendamentos.component.html',
    styleUrls: ['./agendamentos.component.scss'],
    animations: [routerTransition()],
    providers: [
        I18n,
        { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }, // define custom NgbDatepickerI18n provider
        { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter } // define custom Date Format provider
    ]
})
export class AgendamentosComponent extends AgendamentoController implements OnInit, OnDestroy {

    pessoaLogada: Pessoa;
    permissao: string;
    listUnidades: Unidade[];
    selUnidade: Unidade;
    selNumeroUnidade: number;
    selAgeStatus = 'AGENDADO';
    dataInicial: NgbDateStruct;
    dataFinal: NgbDateStruct;
    horaInicio = { hour: 0, minute: 0, second: 0 };
    horaFim = { hour: 0, minute: 0, second: 0 };

    filtrarValido: Boolean;
    apareceFiltrar = true;

    // Tabela com os Dados
    displayedColumns = ['ageAssunto', 'ageData', 'periodo', 'ageStatus', 'detalhes'];
    tableData = new MatTableDataSource<Unidade>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    ngOnInit() {
        // this.carregarAgendamentos();
        this.pessoaLogada = this.sessionStorageService.getValue().pessoa;
        this.permissao = this.pessoaLogada.pesPermissao;
        this.selUnidade = this.pessoaLogada.pesUnidade;

        var today = this.calendar.getToday()
        this.dataFinal = today
        this.dataInicial = today

        this.carregarUnidades();
        this.configurarPaginador();
    }

    ngOnDestroy() {
        this.listUnidades = null;
        this.dataInicial = null;
        this.dataFinal = null;
        this.selUnidade = null
    }

    carregarUnidades() {
        this.unidadeService.buscarAtivas().subscribe(ret => {
            this.listUnidades = ret.data;
        });
    }

    validarCampos(): void {

        this.filtrarValido = false;
        if (!this.dataInicial) {
            alert('Informe uma Data Inicial!')

        } else if (!this.dataFinal) {
            alert('Informe uma Data Final!')

        } else {
            this.filtrarValido = true
            this.filtrarSalas();
        }
    }

    filtrarSalas() {

        if (this.filtrarValido) {

            this.salaService.buscarDisponiveis(this.montarAgendamentoContext()).subscribe(ret => {
                this.tableData.data = ret.data;

            }, err => { },
                () => {
                    if (this.tableData.data.length = 0) {
                        alert('Não foram encontrados registros para os filtros informados!')
                    }
                }
            );
            this.configurarPaginador();
            this.apareceFiltrar = false;
        }
    }

    montarAgendamentoContext(): AgendamentoContext {

        var nDataInicial = new Date(this.dataInicial.year, this.dataInicial.month, this.dataInicial.day);
        var nDataFinal = new Date(this.dataFinal.year, this.dataFinal.month, this.dataFinal.day);

        return {
            idUnidade: this.selNumeroUnidade,
            lotacao: 0,
            dataAgendamento: null,
            dataInicial: DateHelper.montarStringData(nDataInicial),
            dataFinal: DateHelper.montarStringData(nDataFinal),
            idParticipante: this.pessoaLogada.pesId,
            idSala: 0
        }
    }

    limpar() {
        //window.location.reload()

        location.reload()
    }

    editarAgendamento(registro) {
        this.organizeRoomsService.setValue(registro);
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