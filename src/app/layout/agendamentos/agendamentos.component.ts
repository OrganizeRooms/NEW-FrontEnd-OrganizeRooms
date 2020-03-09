import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { AgendamentoService, OrganizeRoomsService, SessionStorageService, UnidadeService } from '../../shared/_services';
import { NgbDateStruct, NgbDatepickerI18n, NgbDateParserFormatter, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter, CustomDatepickerI18n, I18n } from 'src/app/shared/utils/datepicker';
import { configurarPaginador } from 'src/app/shared/utils/table-data';
import { AgendamentoContext, Agendamento, Unidade } from 'src/app/shared/_models';

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
export class AgendamentosComponent implements OnInit, OnDestroy {

    permissao: string;
    listUnidades: Unidade[];
    selUnidade: Unidade;
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

    constructor(
        private agendamentoService: AgendamentoService,
        private calendar: NgbCalendar,
        private unidadeService: UnidadeService,
        private organizeRoomsService: OrganizeRoomsService<Agendamento>,
        private sessionStorageService: SessionStorageService
    ) { }

    ngOnInit() {
        // this.carregarAgendamentos();
        this.permissao = this.sessionStorageService.getValue().pessoa.pesPermissao;
        this.selUnidade = this.sessionStorageService.getValue().pessoa.pesUnidade;

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
            this.tableData.paginator = this.paginator;
        });
    }

    filtrarSalas() {
        this.filtrarValido = this.verificarCampos();

        if (this.filtrarValido) {

            var idResponsavel = this.sessionStorageService.getValue().pessoa.pesId

            var nDataInicial = this.montarStringData(this.dataInicial)
            var nDataFinal = this.montarStringData(this.dataFinal)

            var agendamentoContext: AgendamentoContext = {
                idUnidade: this.selUnidade.uniId,
                lotacao: 0,
                dataInicial: nDataInicial,
                dataFinal: nDataFinal,
                idParticipante: idResponsavel,
                // Não utiliza
                dataAgendamento: null,
                idSala: null
            }
            this.agendamentoService.buscarPorResponsavel(agendamentoContext).subscribe(ret => {
                if (ret.data != null || ret.data != '') {
                    this.tableData.data = ret.data;
                    this.tableData.paginator = this.paginator;
                    this.tableData.sort = this.sort;
                } else {
                    alert('Não foram encontrados registros para os filtros informados!')
                }
            });
            this.configurarPaginador();
        }
    }

    montarStringData(data) {
        var stringData = data.year + '/' + data.month + '/' + data.day
        return stringData
    }

    limpar() {
        //window.location.reload()

        location.reload()
    }

    editarAgendamento(registro) {
        this.organizeRoomsService.setValue(registro);
    }

    // Verificação dos Campos OBRIGATÓRIOS da Verificação de Disponibilidade das Salas
    verificarCampos(): Boolean {

        var mfiltrarValido = false;
        if (!this.dataInicial) {
            alert('Informe uma Data Inicial!')

        } else if (!this.dataFinal) {
            alert('Informe uma Data Final!')

        }
        else {
            mfiltrarValido = true
        }
        return mfiltrarValido
    }

    aplicarFiltro(valor: string) {
        this.tableData.filter = valor.trim().toLowerCase();
    }

    configurarPaginador() {
        this.paginator = configurarPaginador(this.paginator);
    }
}