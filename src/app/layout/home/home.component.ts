import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { routerTransition } from '../../router.animations';
// Date Picker
import { NgbDateStruct, NgbDatepickerI18n, NgbModal, NgbDateParserFormatter, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { I18n, CustomDatepickerI18n, NgbDateCustomParserFormatter } from 'src/app/shared/utils';
import { Agendamento, AgendamentoService, SessionStorageService, ParticipanteService, Participante, AgendamentoContext, Notificacao, EnviaEmail, NotificacaoService } from 'src/app/shared';

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
    listAgendamentos;
    data: NgbDateStruct;
    selAgendamento;
    pessoaLogada;
    participante;

    constructor(
        private modal: NgbModal,
        private calendar: NgbCalendar,
        
        private agendamentoService: AgendamentoService,
        private participanteService: ParticipanteService,        
        private NotificacaoService: NotificacaoService
    ) { }

    ngOnInit() {
        var today = this.calendar.getToday()
        this.data = today;

        this.pessoaLogada = SessionStorageService.getSessionUser().pessoa;
        this.filtro();
    }

    filtro() {

        var nData = this.montarStringDataEng(this.data);

        var agendamentoContext: AgendamentoContext = {
            idUnidade: null,
            lotacao: null,
            dataInicial: null,
            dataFinal: null,
            idSala: null,
            // Filtrar por Participante somente utiliza os campos abaixo
            dataAgendamento: nData,
            idParticipante: this.pessoaLogada.pesId,
        }
        this.agendamentoService.buscarPorParticipanteEDia(agendamentoContext).subscribe(ret => {
            if (ret.data != null && ret.data != '') {
                this.listAgendamentos = ret.data
            } else {
                this.listAgendamentos = null;
            }
        })
    }

    abrirModal(agend, modalDetalhes) {
        this.selAgendamento = agend;
        this.modal.open(modalDetalhes)
    }

    verificarPessoa(agePesResponsavel) {
        var retorno = false
        if (this.pessoaLogada.pesId != agePesResponsavel.pesId) {
            return retorno = true
        }
        return retorno
    }

    verificarStatus(agend) {
        var retorno = false
        if (agend.ageStatus == 'AGENDADO' || agend.ageStatus == 'EM ANDAMENTO') {
            return retorno = true
        }
        return retorno
    }

    verificarConfirmacao(agend) {

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

    aceitarAgendamento(agend) {

        var agendamento = this.gerarNovoAgendamento(agend)
        var part: Participante = {
            parId: null,
            parTipo: null,
            parConfirmado: true,
            parPessoa: this.pessoaLogada,
            parAgendamento: agendamento
        }

        var msg = "Aceito"
        this.atualizar(part, msg)
        location.reload();
    }

    recusarAgendamento(agend) {

        var agendamento = this.gerarNovoAgendamento(agend)

        var part: Participante = {
            parId: null,
            parTipo: null,
            parConfirmado: false,
            parPessoa: this.pessoaLogada,
            parAgendamento: agendamento
        }

        var msg = "Recusado"
        this.atualizar(part, msg)
       

        if (this.participante.parTipo = 2) {
            this.notificarRecusaPartObrigatorio(agend)
        } else{
            //location.reload();
        }

    }

    concluirAgendamento(agend) {
        const agendamento: Agendamento = {
            ageId: agend.ageId,
            ageAssunto: agend.ageAssunto,
            ageDescricao: agend.ageDescricao,
            ageStatus: 'CONCLUIDO',
            agePesAtualizacao: SessionStorageService.getSessionUser().pessoa.pesId,
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

        this.agendamentoService.atualizar(agendamento).subscribe(ret => {
            if (ret.data != null) {
                alert('Agendamento Concluido com Sucesso!');
                location.reload();
            } else {
                alert('Não foi possível Concluir o Agendamento! Tente novamente.');
            }
        });
    }

    notificarRecusaPartObrigatorio(agend) {
        var notificacoes = new Array<Notificacao>()

        var nMensagem = 'O Participante obrigatório ' + this.pessoaLogada.pesNome
            + ' recusou o convite para a Reunião marcada no dia ' + this.montarStringDataPtBr(new Date(agend.ageHoraInicio))
            + ' no período das ' + this.montarStringHoraMinuto(new Date(agend.ageHoraInicio))
            + ' às ' + this.montarStringHoraMinuto(new Date(agend.ageHoraFim)) + '.'

        var nAssunto = 'Participante Obrigatório Recusou Convite para a Reunião'

        var enviaEmail: EnviaEmail = {
            destinatario: agend.agePesResponsavel.pesEmail,  // Email Responsável
            assunto: nAssunto,                               // assunto do e-mail
            mensagem: nMensagem                              // mensagem do e-mail
        }

        var notificacao: Notificacao = {
            notId: null,
            notDescricao: nMensagem,                     // mensagem enviada por e-mail
            notAtiva: true,
            notPessoa: agend.agePesResponsavel, // participante
            notPesCadastro: SessionStorageService.getSessionUser().pessoa.pesId,
            notDtCadastro: new Date(),
            notPesAtualizacao: SessionStorageService.getSessionUser().pessoa.pesId,
            notDtAtualizacao: new Date(),
            notEnviado: false,
            enviaEmail: enviaEmail
        }
        notificacoes.push(notificacao);

        console.log(notificacoes)

        this.NotificacaoService.enviarEmail(notificacoes).subscribe(ret => {
            console.log(ret.data)
            if (ret.data != null) {
                //
            }
        });
    }

    atualizar(participante, msg) {
        this.participanteService.atualizar(participante).subscribe(ret => {
            if (ret.data != null && ret.data != '') {
                alert("Agendamento " + msg + " com Sucesso!")
            } else {
                alert("Agendamento não" + msg + "! Tente novamente.")
            }
        });
    }

    gerarNovoAgendamento(agend): Agendamento {
        let agendamento: Agendamento = {
            ageId: agend.ageId,
            ageAssunto: null,
            ageDescricao: null,
            ageSala: null,
            agePesResponsavel: null,
            ageStatus: null,
            ageData: null,
            ageHoraInicio: null,
            ageHoraFim: null,
            agePesCadastro: null,
            agePesAtualizacao: null,
            ageDtCadastro: null,
            ageDtAtualizacao: null,
            ageEquipamentos: null,
            ageParticipantes: null
        }
        return agendamento
    }

    montarStringDataPtBr(data: Date) {

        var mes = this.validarData(data, 1);
        var dia = this.validarData(data, 2);

        var stringData = dia + '/' + mes + '/' + data.getFullYear()
        return stringData
    }

    montarStringHoraMinuto(horaMinuto: Date) {

        var hora = this.validarData(horaMinuto, 3);
        var minuto = this.validarData(horaMinuto, 4);

        var stringHoraMinuto = hora + ':' + minuto
        return stringHoraMinuto
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


    validarData(valor: Date, tipoValor) {

        var mes;        /// TIPO 1
        var dia;        /// TIPO 2
        var hora;       /// TIPO 3
        var minuto;     /// TIPO 4

        // Mes
        if (tipoValor == 1) {
            if (valor.getUTCMonth() + 1 < 10) {
                mes = '0' + (valor.getUTCMonth() + 1)
            } else {
                mes = valor.getUTCMonth() + 1
            }
            return mes
        }

        // Dia
        if (tipoValor == 2) {
            if (valor.getDate() < 10) {
                dia = '0' + valor.getDate()
            } else {
                dia = valor.getDate()
            }
            return dia
        }

        // Hora
        if (tipoValor == 3) {
            if (valor.getHours() < 10) {
                hora = '0' + valor.getHours()
            } else {
                hora = valor.getHours()
            }
            return hora
        }

        if (tipoValor == 4) {
            if (valor.getMinutes() < 10) {
                minuto = '0' + valor.getMinutes()
            } else {
                minuto = valor.getMinutes()
            }
            return minuto
        }
    }

}
