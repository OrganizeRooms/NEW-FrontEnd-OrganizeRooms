import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MatStepper } from '@angular/material';

import {
  Pessoa, Unidade, Sala, AgendamentoContext, Equipamento, Agendamento,
  Participante, ReservaEquipamento, EnviaEmail, Notificacao
} from 'src/app/shared/_models';
import { DateHelper } from 'src/app/shared/_helpers';
import { SelecionarEquipamentosComponent, SelecionarPessoasComponent } from '../../components/agendamento';
import { AgendamentoService, NotificacaoService } from 'src/app/shared';

@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.component.html',
  styleUrls: ['./agendar.component.scss']
})

export class AgendarComponent implements OnInit {

  @Input() stepper: MatStepper;
  @Input() agendamento: Agendamento;

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
    private notificacaoService: NotificacaoService,
    private agendamentoService: AgendamentoService
  ) { }

  ngOnInit() {

    this.data = this.agendamento.ageData;
    this.horaInicio = this.agendamento.ageHoraInicio;
    this.horaFim = this.agendamento.ageHoraFim;
    this.selSala = this.agendamento.ageSala;

    this.lotacao = this.selSala.salaLotacao;
    this.responsavel = this.agendamento.agePesResponsavel.pesNome;
    this.selUnidade = this.agendamento.ageSala.salaUnidade;

    this.criarFormulario();
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
      idParticipante: 0,
      idSala: 0
    }
  }

  agendar() {

    this.montarAgendamento();

    let retAgendamento: Agendamento;
    this.agendamentoService.adicionar(this.agendamento).subscribe(ret => {
      retAgendamento = ret.data;
    });

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

    var participantes = new Array<Participante>();
    if (this.pessoasSelecionadas.length == 0) return participantes;

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

    var reservas = new Array<ReservaEquipamento>();
    if (this.equipamentosSelecionados.length == 0) return reservas;

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

  notificarParticipantes(participantes: Participante[]) {

    let notificacoes: Notificacao[];

    participantes.forEach(part => {

      notificacoes.push(this.montarNotificacao(part));
    });

    let retorno: boolean;
    this.notificacaoService.enviarEmail(notificacoes).subscribe(ret => {
      retorno = ret.data;
    });
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
      assunto: this.agendamento.assuntoEmailPadrao,
      mensagem: this.verificarMensagemParticipante(tipoParticipante)
    }
  }

  verificarMensagemParticipante(tipoParticipante: number): string {

    if (tipoParticipante == 1) { // tipo 1 Normal

      return this.agendamento.msgEmailPadrao;

    } else { // tipo 2 obrigatorio

      return this.agendamento.msgEmailPartObrigatorio;
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
