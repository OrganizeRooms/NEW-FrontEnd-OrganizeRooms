import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';

import { Pessoa, Unidade, Sala, AgendamentoContext, Equipamento, Agendamento } from 'src/app/shared/_models';
import { DateHelper } from 'src/app/shared/_helpers';
import { SelecionarEquipamentosComponent, SelecionarPessoasComponent } from '../../components/agendamento';
import { AgendamentoController } from 'src/app/shared';

@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.component.html',
  styleUrls: ['./agendar.component.scss']
})

export class AgendarComponent extends AgendamentoController implements OnInit {

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

  abrirModal(component: string) {

    this.equipamentosSelecionados = <Equipamento[]>this.abrirModalSelecao(component);
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

    }, err => { },
      () => {

        if (retAgendamento != null) {
          this.agendado = true;

          this.notificarParticipantes(this.agendamento);
          this.next();

        } else {
          alert('Não foi possível Finalizar o Agendamento! Tente novamente.');

        }
      });
  }

  montarAgendamento(): void {

    this.agendamento.ageAssunto = this.formAgendar.value.ageAssunto;
    this.agendamento.ageDescricao = this.formAgendar.value.ageDescricao;
    this.agendamento.ageParticipantes = this.montaArrayParticipantes(this.pessoasSelecionadas);
    this.agendamento.ageEquipamentos = this.montaArrayReservaEquipamento(this.equipamentosSelecionados);
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
