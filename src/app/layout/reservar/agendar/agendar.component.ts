import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MatStepper } from '@angular/material';

import {
  Pessoa, Unidade, Sala, AgendamentoContext, Equipamento, Agendamento,
  Participante, ReservaEquipamento, EnviaEmail, Notificacao
} from 'src/app/shared/_models';
import { AgendamentoController, NotificacaoController } from 'src/app/shared/_controllers';
import { DateHelper } from 'src/app/shared/_helpers';
import { SelecionarEquipamentosComponent, SelecionarPessoasComponent } from '../../components/agendamento';

@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.component.html',
  styleUrls: ['./agendar.component.scss']
})

export class AgendarComponent implements OnInit {

  @Input() stepper: MatStepper;
  @Input() agendamento: Agendamento;

  listUnidades: Unidade[];
  selUnidade: Unidade;
  lotacao: number;
  data: Date;
  horaInicio: Date;
  horaFim: Date;
  selSala: Sala;
  responsavel: string;

  // Agendamento
  formAgendar: FormGroup;
  agendado = false;

  pessoasSelecionadas: Pessoa[];
  equipamentosSelecionados: Equipamento[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private agendamentoController: AgendamentoController,
    private notificacaoController: NotificacaoController
  ) { }

  ngOnInit() {


    this.data = this.agendamento.ageData;
    this.horaInicio = this.agendamento.ageHoraInicio;
    this.horaFim = this.agendamento.ageHoraFim;
    this.selSala = this.agendamento.ageSala;
    console.log(this.selSala);

    this.lotacao = this.selSala.salaLotacao;
    this.responsavel = this.agendamento.agePesResponsavel.pesNome;
    this.selUnidade = this.agendamento.ageSala.salaUnidade;

    this.criarFormulario();
  }

  ngOnDestroy() {
    this.formAgendar = null;
    this.listUnidades = null;
    this.data = null;
    this.selUnidade = null;
    this.lotacao = 0;
  }

  criarFormulario() {
    this.formAgendar = this.formBuilder.group({
      ageAssunto: [null, Validators.required],
      ageDescricao: [null],
    });
  }

  abrirModalEquipamentos() {

    const modalRef = this.modalService.open(SelecionarEquipamentosComponent);
    modalRef.componentInstance.agendamento = this.agendamento;

    modalRef.result.then((resultado: Equipamento[]) => {
      if (resultado) {
        this.equipamentosSelecionados = resultado;
      }
    });
  }

  abrirModalPessoas() {

    const modalRef = this.modalService.open(SelecionarPessoasComponent);

    modalRef.result.then((resultado: Pessoa[]) => {
      if (resultado) {
        this.pessoasSelecionadas = resultado;
      }
    });
  }

  getEquipamentos($event: Equipamento[]) {
    this.equipamentosSelecionados = $event;
  }

  getPessoas($event: Pessoa[]) {
    this.pessoasSelecionadas = $event;
  }

  montarAgendamentoContext(): AgendamentoContext {

    return {
      idUnidade: this.selUnidade.uniId,
      lotacao: this.lotacao,
      dataAgendamento: DateHelper.montarStringDataEng(this.data),
      dataInicial: DateHelper.montarStringDataHoraEng(this.horaInicio),
      dataFinal: DateHelper.montarStringDataHoraEng(this.horaFim),
      idParticipante: null,
      idSala: null
    }
  }

  async agendar() {

    this.montarAgendamento();
    let retAgendamento = await this.agendamentoController.adicionar(this.agendamento);

    if (retAgendamento != null) {
      this.agendado = true;

      this.notificarParticipantes(this.agendamento.ageParticipantes);
      this.next();

    } else {
      alert('Não foi possível Finalizar o Agendamento! Tente novamente.');
    }
  }

  montarAgendamento(): void {

    this.agendamento.ageAssunto = this.formAgendar.value.ageAssunto;
    this.agendamento.ageDescricao = this.formAgendar.value.ageDescricao;
    this.agendamento.ageParticipantes = this.montaArrayParticipantes();
    this.agendamento.ageEquipamentos = this.montaArrayReservaEquipamento();
  }

  montaArrayParticipantes(): Participante[] {

    if (this.pessoasSelecionadas.length == 0) return null;

    var participantes: Participante[];
    this.pessoasSelecionadas.forEach(pessoa => {

      var nParTipo = pessoa.participanteObrigatorio ? 2 : 1;
      var part: Participante = {
        parId: 0,
        parTipo: nParTipo,
        parConfirmado: null,
        parPessoa: pessoa,
        parAgendamento: null,
      }
      participantes.push(part);
    });

    return participantes;
  }

  montaArrayReservaEquipamento(): ReservaEquipamento[] {

    if (this.equipamentosSelecionados.length == 0) return null;

    var reservas: ReservaEquipamento[];
    this.equipamentosSelecionados.forEach(equip => {

      var reserva: ReservaEquipamento = {
        resId: 0,
        equipamento: equip,
        agendamento: null,
      }
      reservas.push(reserva);
    });

    return reservas;
  }

  async notificarParticipantes(participantes: Participante[]) {

    let notificacoes: Notificacao[];

    participantes.forEach(part => {

      notificacoes.push(this.montarNotificacao(part));
    });

    let retorno = await this.notificacaoController.enviarEmail(notificacoes);
  }

  montarNotificacao(participante: Participante): Notificacao {

    var enviaEmail = this.montarEnviarEmail(participante.parPessoa.pesEmail, participante.parTipo);

    return {
      notId: 0,
      notDescricao: enviaEmail.mensagem,
      notAtiva: true,
      notPessoa: participante.parPessoa,
      notPesCadastro: this.agendamento.agePesResponsavel.pesId,
      notDtCadastro: new Date(),
      notPesAtualizacao: this.agendamento.agePesResponsavel.pesId,
      notDtAtualizacao: new Date(),
      notEnviado: false,
      enviaEmail: enviaEmail
    }
  }

  montarEnviarEmail(email: string, tipoParticipante: number): EnviaEmail {

    return {
      destinatario: email,
      assunto: this.agendamentoController.assuntoPadrao(this.agendamento.agePesResponsavel.pesNome),
      mensagem: this.verificarMensagemParticipante(tipoParticipante)
    }
  }

  verificarMensagemParticipante(tipoParticipante: number): string {

    if (tipoParticipante == 1) { // tipo 1 Normal

      return this.agendamentoController.msgNotificacaoPadrao(
        this.data,
        this.horaInicio,
        this.horaFim,
        this.agendamento.agePesResponsavel.pesNome
      );

    } else { // tipo 2 obrigatorio

      return this.agendamentoController.msgNotificacaoPartObrigatorio(
        this.data,
        this.horaInicio,
        this.horaFim,
        this.agendamento.agePesResponsavel.pesNome
      )
    }
  }

  chamarMontarStringData(data: Date): string {
    return DateHelper.montarStringData(data);
  }

  chamarMontarStringHoraMinuto(hora: Date): string {
    return DateHelper.montarStringHoraMinuto(hora);
  }

  fechar() {
    this.router.navigate(['/home']);
  }

  next() {
    this.stepper.selected.completed = true;
    this.stepper.next();
  }
}
