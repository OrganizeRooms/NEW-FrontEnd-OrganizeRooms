import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { routerTransition } from '../../router.animations';
// Date Picker
import { NgbDateStruct, NgbDatepickerI18n, NgbModal, NgbDateParserFormatter, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter, CustomDatepickerI18n, I18n } from 'src/app/shared/utils/datepicker';
import { AgendamentoService, SessionStorageService, ParticipanteService } from 'src/app/shared/_services';
import { NotificacaoController, AgendamentoController } from 'src/app/shared/_controllers';
import { Agendamento, Participante, AgendamentoContext, Notificacao, EnviaEmail, Pessoa } from 'src/app/shared/_models';
import { DateHelper } from 'src/app/shared';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [routerTransition()],
    providers: [
        I18n,
        { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }, // define custom NgbDatepickerI18n provider
        { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter } // define custom Date Format provider
    ]
})
export class HomeComponent implements OnInit {

    // listAgendamentos: Agendamento;
    listAgendamentos: Array<Agendamento>;
    data: NgbDateStruct;
    selAgendamento: Agendamento;
    pessoaLogada: Pessoa;
    participante: Participante;

    constructor(
        private modal: NgbModal,
        private calendar: NgbCalendar,
        private sessionStorageService: SessionStorageService,
        private agendamentoService: AgendamentoService,
        private participanteService: ParticipanteService,
        private notificacaoController: NotificacaoController,
        private agendamentoController: AgendamentoController
    ) { }

    ngOnInit() {
        var today = this.calendar.getToday()
        this.data = today;

        this.pessoaLogada = this.sessionStorageService.getValue().pessoa;
        this.filtro();
    }

    filtro() {

        var nData = DateHelper.montarStringDataEng(new Date(this.data.year, this.data.month, this.data.day));

        var agendamentoContext: AgendamentoContext = {
            idUnidade: 0,
            lotacao: 0,
            dataInicial: '',
            dataFinal: '',
            idSala: 0,
            // Filtrar por Participante somente utiliza os campos abaixo
            dataAgendamento: nData,
            idParticipante: this.pessoaLogada.pesId,
        }

        this.agendamentoService.buscarPorParticipanteEDia(agendamentoContext).subscribe(ret => {
            this.listAgendamentos = ret.data;
        })
    }

    abrirModal(agend: Agendamento, modalDetalhes: NgbModal) {
        this.selAgendamento = agend;
        this.modal.open(modalDetalhes)
    }

    verificarPessoa(agePesResponsavel: Pessoa) {
        var retorno = false
        if (this.pessoaLogada.pesId != agePesResponsavel.pesId) {
            return retorno = true
        }
        return retorno
    }

    verificarStatus(agend: Agendamento) {
        var retorno = false
        if (agend.ageStatus == 'AGENDADO' || agend.ageStatus == 'EM ANDAMENTO') {
            return retorno = true
        }
        return retorno
    }

    verificarConfirmacao(agend: Agendamento) {

        var retorno = false
        agend.ageParticipantes.forEach(part => {
            if (part.parPessoa.pesId == this.pessoaLogada.pesId) {
                if (part.parConfirmado == null) {
                    this.participante = part
                    return retorno = true
                }
            }
        });
        return retorno
    }

    aceitarAgendamento(agend: Agendamento) {

        var part: Participante = {
            parId: 0,
            parTipo: 1,
            parConfirmado: true,
            parPessoa: this.pessoaLogada,
            parAgendamento: this.agendamentoController.montarAgendamentoComId(agend.ageId)
        }

        var msg = "Aceito"
        this.atualizar(part, msg)
        location.reload();
    }

    recusarAgendamento(agend: Agendamento) {

        var part: Participante = {
            parId: 0,
            parTipo: 1,
            parConfirmado: false,
            parPessoa: this.pessoaLogada,
            parAgendamento: this.agendamentoController.montarAgendamentoComId(agend.ageId)
        }

        var msg = "Recusado"
        this.atualizar(part, msg)


        if (this.participante.parTipo = 2) {
            this.notificarRecusaPartObrigatorio(agend)
        } else {
            //location.reload();
        }

    }

    concluirAgendamento(agend: Agendamento) {
        const agendamento: Agendamento = {
            ageId: agend.ageId,
            ageAssunto: agend.ageAssunto,
            ageDescricao: agend.ageDescricao,
            ageStatus: 'CONCLUIDO',
            agePesAtualizacao: this.sessionStorageService.getValue().pessoa.pesId,
            ageDtAtualizacao: new Date(),
            ageEquipamentos: agend.ageEquipamentos,
            // Atributos que não são alterados e possuem trava no BackEnd
            ageDtCadastro: agend.ageDtCadastro,
            ageSala: null,
            agePesResponsavel: agend.agePesResponsavel,
            ageData: agend.ageData,
            ageHoraInicio: agend.ageHoraInicio,
            ageHoraFim: agend.ageHoraFim,
            agePesCadastro: agend.agePesCadastro,
            ageParticipantes: null
        }

        this.agendamentoService.atualizar(agendamento).subscribe(ret => {
            if (ret.data != null) {
                alert('Agendamento Concluido com Sucesso!');
                location.reload();
            } else {
                alert('Não foi possível Concluir o Agendamento! Tente novamente.');
            }
        });
    }

    notificarRecusaPartObrigatorio(agend: Agendamento) {
        var notificacoes = new Array<Notificacao>()

        var nMensagem = 'O Participante obrigatório ' + this.pessoaLogada.pesNome
            + ' recusou o convite para a Reunião marcada no dia ' + DateHelper.montarStringData(new Date(agend.ageHoraInicio))
            + ' no período das ' + DateHelper.montarStringHoraMinuto(new Date(agend.ageHoraInicio))
            + ' às ' + DateHelper.montarStringHoraMinuto(new Date(agend.ageHoraFim)) + '.'

        var nAssunto = 'Participante Obrigatório Recusou Convite para a Reunião'

        var enviaEmail: EnviaEmail = {
            destinatario: agend.agePesResponsavel.pesEmail,  // Email Responsável
            assunto: nAssunto,                               // assunto do e-mail
            mensagem: nMensagem                              // mensagem do e-mail
        }

        var notificacao: Notificacao = {
            notId: 0,
            notDescricao: nMensagem,                     // mensagem enviada por e-mail
            notAtiva: true,
            notPessoa: agend.agePesResponsavel, // participante
            notPesCadastro: this.sessionStorageService.getValue().pessoa.pesId,
            notDtCadastro: new Date(),
            notPesAtualizacao: this.sessionStorageService.getValue().pessoa.pesId,
            notDtAtualizacao: new Date(),
            notEnviado: false,
            enviaEmail: enviaEmail
        }
        notificacoes.push(notificacao);

        this.notificacaoController.enviarEmail(notificacoes);
    }

    atualizar(participante: Participante, msg: string) {
        this.participanteService.atualizar(participante).subscribe(ret => {
            if (ret.data != null && ret.data != '') {
                alert("Agendamento " + msg + " com Sucesso!")
            } else {
                alert("Agendamento não" + msg + "! Tente novamente.")
            }
        });
    }

}
