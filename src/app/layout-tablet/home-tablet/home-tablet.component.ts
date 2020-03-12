import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormControl } from '@angular/forms';
// Date Picker
import { NgbDateStruct, NgbDatepickerI18n, NgbModal, NgbDateParserFormatter, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter, CustomDatepickerI18n, I18n } from 'src/app/shared/utils/datepicker';
import { DateHelper } from 'src/app/shared/_helpers'
import { AgendamentoService, SessionStorageService, SalaService } from 'src/app/shared/_services';
import { Agendamento, AgendamentoContext, Pessoa, Sala } from 'src/app/shared/_models';

@Component({
    selector: 'app-home-tablet',
    templateUrl: './home-tablet.component.html',
    styleUrls: ['./home-tablet.component.scss'],
    animations: [routerTransition()],
    providers: [
        I18n,
        { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }, // define custom NgbDatepickerI18n provider
        { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter } // define custom Date Format provider
    ]
})
export class HomeTabletComponent implements OnInit {

    listAgendamentos: Agendamento[];
    data: NgbDateStruct
    selAgendamento: Agendamento;
    pessoaLogada: Pessoa;
    listSalas: Sala[]
    selSala = new FormControl();

    constructor(
        private modal: NgbModal,
        private calendar: NgbCalendar,
        private sessionStorageService: SessionStorageService,
        private agendamentoService: AgendamentoService,
        private salaService: SalaService,
    ) { }

    ngOnInit() {
        var today = this.calendar.getToday()
        this.data = today;

        this.pessoaLogada = this.sessionStorageService.getValue().pessoa;
        this.carregarTodasSalas();

        this.selSala = new FormControl(1)
        this.filtro();
    }

    carregarTodasSalas() {
        this.salaService.buscarTodos().subscribe(ret => {
            if (ret.data != null || ret.data != '') {
                this.listSalas = ret.data;
            } else {
                this.listSalas = null
            }
        });
    }

    filtro() {
        var agendamentoContext: AgendamentoContext = {
            idUnidade: 0,
            lotacao: 0,
            dataInicial: '',
            dataFinal: '',
            idParticipante: 0,
            // Filtrar por Sala somente utiliza os campos abaixo
            dataAgendamento: DateHelper.montarStringDataEng(new Date(this.data.year, this.data.month, this.data.day)),
            idSala: this.selSala.value,
        }

        this.agendamentoService.buscarPorSalaEData(agendamentoContext).subscribe(ret => {
            if (ret.data != null && ret.data != '') {
                this.listAgendamentos = ret.data
            } else {
                this.listAgendamentos = null;
            }
        })
    }

    verificarStatus(agend: Agendamento) {
        var retorno = false
        if (agend.ageStatus == 'AGENDADO' || agend.ageStatus == 'EM ANDAMENTO') {
            return retorno = true
        }
        return retorno
    }

    concluirAgendamento(agend: Agendamento) {
        const agendamento: Agendamento = {
            ageId: agend.ageId,
            ageAssunto: agend.ageAssunto,
            ageDescricao: agend.ageDescricao,
            ageSala: agend.ageSala,
            // Atributos que não são alterados e possuem trava no BackEnd
            agePesResponsavel: agend.agePesResponsavel,
            ageStatus: 'CONCLUIDO',
            ageData: agend.ageData,
            ageHoraInicio: agend.ageHoraInicio,
            ageHoraFim: agend.ageHoraFim,
            agePesCadastro: agend.agePesCadastro,
            agePesAtualizacao: this.sessionStorageService.getValue().pessoa.pesId,
            ageDtCadastro: agend.ageDtCadastro,
            ageDtAtualizacao: new Date(),
            ageEquipamentos: null,
            ageParticipantes: null
        };

        this.agendamentoService.atualizar(agendamento).subscribe(ret => {
            if (ret.data != null) {
                alert('Agendamento Concluido com Sucesso!');
                location.reload();
            } else {
                alert('Não foi possível Concluir o Agendamento! Tente novamente.');
            }
        });
    }

    abrirModal(agend, modalDetalhes) {
        this.selAgendamento = agend;
        this.modal.open(modalDetalhes)
    }
}
