import { NgbModal, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { SelecionarEquipamentosComponent, SelecionarPessoasComponent } from 'src/app/layout/components/agendamento';
import {
    Mensagem, Pessoa, Equipamento, Agendamento, Participante, ReservaEquipamento,
    Notificacao, EnviaEmail, montarAgendamentoComId
} from '../_models';
import {
    MensagemService, AgendamentoService, NotificacaoService, UnidadeService, OrganizeRoomsService,
    SalaService, ParticipanteService, ReservaEquipamentoService, SessionStorageService
} from '../_services';
import { SubstituirTags } from 'src/app/shared/_helpers';
import { Directive } from '@angular/core';

@Directive()
export class AgendamentoController {

    protected listaMensagens: Mensagem[];
    protected assuntoEmail: string;
    protected assuntoRetiradoReuniao: string;
    protected msgPartComum: string;
    protected msgPartObrigatorio: string;
    protected msgRetiradoReuniao: string;

    private agendamentoHelper: Agendamento;

    constructor(
        protected formBuilder: FormBuilder,
        protected router: Router,
        protected calendar: NgbCalendar,
        protected modalService: NgbModal,
        protected organizeRoomsService: OrganizeRoomsService<Agendamento>,
        protected sessionStorageService: SessionStorageService,
        protected notificacaoService: NotificacaoService,
        protected agendamentoService: AgendamentoService,
        protected mensagemService: MensagemService,
        protected unidadeService: UnidadeService,
        protected salaService: SalaService,
        protected participanteService: ParticipanteService,
        protected reservaEquipamentoService: ReservaEquipamentoService
    ) { }


    private buscarMensagens() {
        this.mensagemService.buscarTodos().subscribe(ret => {
            this.listaMensagens = ret.data;

        }, err => { },
            () => {

                this.listaMensagens.forEach(msg => {
                    this.assuntoEmail = msg.menTipo == 1 ? msg.menMensagem : '';
                    this.assuntoRetiradoReuniao = msg.menTipo == 2 ? msg.menMensagem : '';
                    this.msgPartComum = msg.menTipo == 3 ? msg.menMensagem : '';
                    this.msgPartObrigatorio = msg.menTipo == 4 ? msg.menMensagem : '';
                    this.msgRetiradoReuniao = msg.menTipo == 5 ? msg.menMensagem : '';
                });

            }
        );
    }

    abrirModalSelecao(
        component: string,
        ehAgendamento = false,
        agendamento?: Agendamento): Pessoa[] | Equipamento[] {

        const modalRef = this.modalService.open(
            component == 'SelecionarPessoasComponent' ? SelecionarPessoasComponent : SelecionarEquipamentosComponent
        );

        if (ehAgendamento) {
            modalRef.componentInstance.agendamento = agendamento;
        }

        let resultado: Pessoa[] | Equipamento[];
        modalRef.result.then((retorno) => {
            if (retorno) {
                resultado = retorno;
            }
        });
        return resultado;
    }

    inserirParticipantes(participantes: Participante[], agendamento: Agendamento) {

        let retorno: boolean;
        this.participanteService.adicionarLista(participantes).subscribe(ret => {
            retorno = ret.data;

        }, err => { },
            () => {
                if (retorno) {
                    console.log('AGENDAMENTO PARTICIPANTES ANTES');
                    console.log(agendamento.ageParticipantes);

                    agendamento.ageParticipantes = participantes;
                    console.log('AGENDAMENTO PARTICIPANTES DEPOIS');
                    console.log(agendamento.ageParticipantes);

                    this.notificarParticipantes(agendamento);

                }
                else {
                    alert('Participante(s) NÃO adicionado(s)! Tente Novamente!')
                }
            }
        );
    }

    montaArrayParticipantes(pessoas: Pessoa[], idAgendamento = 0): Participante[] {

        var participantes = new Array<Participante>();
        if (pessoas.length == 0) return participantes;

        pessoas.forEach(pessoa => {

            var nParTipo = pessoa.participanteObrigatorio ? 2 : 1;
            var part: Participante = {
                parId: 0,
                parTipo: nParTipo,
                parConfirmado: null,
                parPessoa: pessoa,
                parAgendamento: montarAgendamentoComId(idAgendamento),
            }
            participantes.push(part);
        });

        return participantes;
    }

    inserirReservasEquipamento(equipamentos: ReservaEquipamento[]) {

        this.reservaEquipamentoService.adicionarLista(equipamentos).subscribe(ret => {
            if (!ret.data) {
                console.log(JSON.stringify(ret.erros));
                alert('Equipamento(s) NÃO adicionado(s)! Tente Novamente!')
            }
        });
    }

    montaArrayReservaEquipamento(equipamentos: Equipamento[], idAgendamento = 0): ReservaEquipamento[] {

        var reservas = new Array<ReservaEquipamento>();
        if (equipamentos.length == 0) return reservas;

        equipamentos.forEach(equip => {
            var reserva: ReservaEquipamento = {
                resId: 0,
                equipamento: equip,
                agendamento: montarAgendamentoComId(idAgendamento),
            }
            reservas.push(reserva);
        });

        return reservas;
    }

    notificarParticipantes(agendamento: Agendamento, retiradoPart = false) {
        this.agendamentoHelper = agendamento;
        this.buscarMensagens();

        let notificacoes: Notificacao[];

        agendamento.ageParticipantes.forEach(part => {
            notificacoes.push(this.montarNotificacao(part, retiradoPart));
        });

        let retorno: boolean;
        this.notificacaoService.enviarEmail(notificacoes).subscribe(ret => {
            retorno = ret.data;
        });
    }

    montarNotificacao(participante: Participante, retiradoPart = false): Notificacao {

        var enviaEmail = this.montarEnviarEmail(participante, retiradoPart);

        return {
            notId: 0,
            notDescricao: enviaEmail.mensagem,
            notAtiva: true,
            notPessoa: participante.parPessoa,
            notPesCadastro: this.agendamentoHelper.agePesResponsavel.pesId,
            notDtCadastro: new Date(),
            notPesAtualizacao: this.agendamentoHelper.agePesResponsavel.pesId,
            notDtAtualizacao: new Date(),
            notEnviado: false,
            enviaEmail: enviaEmail
        }
    }

    montarEnviarEmail(participante: Participante, retiradoPart = false): EnviaEmail {

        let assunto = retiradoPart ? this.assuntoRetiradoReuniao : this.assuntoEmail;
        let mensagem = retiradoPart ? this.msgRetiradoReuniao : this.mensagemParticipante(participante.parTipo);

        return {
            destinatario: participante.parPessoa.pesEmail,
            assunto: SubstituirTags.agendamento(assunto, this.agendamentoHelper, participante),
            mensagem: SubstituirTags.agendamento(mensagem, this.agendamentoHelper, participante)
        }
    }

    mensagemParticipante(tipoParticipante: number): string {

        if (tipoParticipante == 1) { // tipo 1 Normal
            return this.msgPartComum;

        } else {                    // tipo 2 obrigatorio
            return this.msgPartObrigatorio;
        }
    }

    deletarParticipante(participante: Participante, agendamento: Agendamento) {

        let retorno: boolean;
        this.participanteService.deletar(participante.parId).subscribe(ret => {
            retorno = ret.data;

        }, err => { },
            () => {
                if (retorno) {
                    alert(`Participante ${participante.parPessoa.pesNome} retirado da Reunião com Sucesso!\nRecarregue a página.`)

                    agendamento.ageParticipantes = ([] as Participante[]).concat(participante);
                    this.notificarParticipantes(agendamento, true);

                } else {
                    alert(`Erro ao retirar participante ${participante.parPessoa.pesNome}. Tente novamente!`);
                }
            }
        );
    }

    deletarReservaEquipamento(reserva: ReservaEquipamento) {

        this.reservaEquipamentoService.deletar(reserva.resId).subscribe(ret => {
            if (ret.data) {
                alert(`Equipamento ${reserva.equipamento.equNome} removido com Sucesso!\nRecarregue a página.`);

            } else {
                alert(`Erro ao retirar Equipamento ${reserva.equipamento.equNome}`);
            }
        });
    }

}
