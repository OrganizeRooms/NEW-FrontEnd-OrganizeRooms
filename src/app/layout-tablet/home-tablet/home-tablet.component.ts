import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { routerTransition } from '../../router.animations';
// Date Picker
import { NgbDateStruct, NgbDatepickerI18n, NgbModal, NgbDateParserFormatter, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { I18n, CustomDatepickerI18n, NgbDateCustomParserFormatter } from 'src/app/shared/utils';
import { Agendamento, AgendamentoService, SessionStorageService, ParticipanteService, Participante, AgendamentoContext, SalaService } from 'src/app/shared';
import { FormControl } from '@angular/forms';

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

    // listAgendamentos: Agendamento;
    listAgendamentos
    data: NgbDateStruct
    selAgendamento
    pessoaLogada
    listSalas: any[]
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
        var nData = this.montarStringDataEng(this.data);

        var agendamentoContext: AgendamentoContext = {
            idUnidade: null,
            lotacao: null,
            dataInicial: null,
            dataFinal: null,
            idParticipante: null,
            // Filtrar por Sala somente utiliza os campos abaixo
            dataAgendamento: nData,
            idSala: this.selSala.value,
        }
        console.log(agendamentoContext)
        this.agendamentoService.buscarPorSalaEData(agendamentoContext).subscribe(ret => {
            if (ret.data != null && ret.data != '') {
                this.listAgendamentos = ret.data
            } else {
                this.listAgendamentos = null;
            }
        })
    }

    verificarStatus(agend) {
        var retorno = false
        if (agend.ageStatus == 'AGENDADO' || agend.ageStatus == 'EM ANDAMENTO') {
            return retorno = true
        }
        return retorno
    }

    concluirAgendamento(agend) {
        const agendamento: Agendamento = {
            ageId: agend.ageId,
            ageAssunto: agend.ageAssunto,
            ageDescricao: agend.ageDescricao,
            ageStatus: 'CONCLUIDO',
            agePesAtualizacao: this.sessionStorageService.getValue().pessoa.pesId,
            ageDtAtualizacao: new Date(),
            ageEquipamentos: agend.ageEquipamentos,
            // Atributos que não são alterados e possuem trava no BackEnd
            ageDtCadastro: null,
            ageSala: null,
            agePesResponsavel: null,
            ageData: null,
            ageHoraInicio: null,
            ageHoraFim: null,
            agePesCadastro: null,
            ageParticipantes: null
        }
        console.log(agendamento)

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

        console.log(  this.selAgendamento)
        console.log( agend)
        this.modal.open(modalDetalhes)
    }

    montarStringDataEng(data) {

        var mes;
        var dia;

        if (data.month < 10) {
            mes = '0' + data.month
        } else {
            mes = data.month
        }

        if (data.day < 10) {
            dia = '0' + data.day
        } else {
            dia = data.day
        }

        var stringData = data.year + '/' + mes + '/' + dia
        return stringData
    }
}
