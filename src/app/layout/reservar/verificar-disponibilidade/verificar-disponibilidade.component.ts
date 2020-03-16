import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { MatStepper } from '@angular/material/stepper';

import { Pessoa, Unidade, Sala, AgendamentoContext, Hora, Agendamento } from 'src/app/shared/_models';
import { SessionStorageService, UnidadeService, SalaService } from 'src/app/shared/_services';
import { DateHelper } from 'src/app/shared/_helpers';

@Component({
  selector: 'app-verificar-disponibilidade',
  templateUrl: './verificar-disponibilidade.component.html',
  styleUrls: ['./verificar-disponibilidade.component.scss']
})

export class VerificarDisponibilidadeComponent implements OnInit {

  @Input() stepper: MatStepper;
  @Output() agendamento = new EventEmitter<Agendamento>();

  // Outros
  today: any;

  pessoaLogada: Pessoa;
  listUnidades: Unidade[];
  selUnidade: Unidade;
  selNumeroUnidade: number;
  lotacao = 0;
  data: NgbDateStruct;
  horaInicio: Hora;
  horaFim: Hora;
  listSalas: Sala[];
  selSala: Sala;
  filtrarValido: boolean;
  apareceFiltrar = true;

  constructor(
    private calendar: NgbCalendar,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private unidadeService: UnidadeService,
    private salaService: SalaService
  ) { }

  ngOnInit() {

    this.today = this.calendar.getToday()
    this.data = this.today;
    this.pessoaLogada = this.sessionStorageService.getValue().pessoa;
    this.selNumeroUnidade = this.pessoaLogada.pesUnidade.uniId
    this.horaInicio = { hour: 0, minute: 0, second: 0 };
    this.horaFim = { hour: 0, minute: 0, second: 0 };

    this.carregarUnidades();
  }

  carregarUnidades() {
    this.unidadeService.buscarAtivas().subscribe(ret => {
      this.listUnidades = ret.data;
    });
  }

  // Verificação dos Campos OBRIGATÓRIOS da Verificação de Disponibilidade das Salas
  validarCampos(): void {

    this.filtrarValido = false;
    if (!this.selNumeroUnidade) {
      alert('Informe a Unidade!')

    } else if (!this.data) {
      alert('Informe uma Data!')

    } else if (this.horaInicio.hour == this.horaFim.hour && this.horaInicio.minute == this.horaFim.minute) {
      alert('Informe Horas Diferentes!')

    } else {
      this.filtrarValido = true
      this.filtrarSalas();
    }
  }

  filtrarSalas() {

    if (this.filtrarValido) {

      this.salaService.buscarDisponiveis(this.montarAgendamentoContext()).subscribe(ret => {
        this.listSalas = ret.data;
      });

      this.apareceFiltrar = false;
    }
  }

  montarAgendamentoContext(): AgendamentoContext {

    let newData = new Date(this.data.year, this.data.month, this.data.day);
    return {
      idUnidade: this.selNumeroUnidade,
      lotacao: this.lotacao,
      dataAgendamento: DateHelper.montarStringDataEng(newData),
      dataInicial: DateHelper.montarStringDataHoraEng(newData, this.horaInicio),
      dataFinal: DateHelper.montarStringDataHoraEng(newData, this.horaFim),
      idParticipante: 0,
      idSala: 0
    }
  }

  montarAgendamento(): Agendamento {

    let ageData = new Date(this.data.year, this.data.month, this.data.day);

    return {
      ageId: 0,
      ageAssunto: '',
      ageDescricao: '',
      ageSala: this.montarNovaSala(),
      agePesResponsavel: this.pessoaLogada,
      ageStatus: 'AGENDADO',
      ageData: ageData,
      ageHoraInicio: DateHelper.montarDataHora(ageData, this.horaInicio),
      ageHoraFim: DateHelper.montarDataHora(ageData, this.horaFim),
      agePesCadastro: this.pessoaLogada.pesId,
      agePesAtualizacao: this.pessoaLogada.pesId,
      ageDtCadastro: new Date(),
      ageDtAtualizacao: new Date(),
      ageEquipamentos: null,
      ageParticipantes: null
    };
  }

  montarNovaSala(): Sala {

    this.buscarUnidade();

    return {
      salaId: this.selSala.salaId,
      salaNome: this.selSala.salaNome,
      salaLotacao: this.selSala.salaLotacao,
      salaAtiva: this.selSala.salaAtiva,
      salaPesCadastro: this.selSala.salaPesCadastro,
      salaDtCadastro: this.selSala.salaDtCadastro,
      salaPesAtualizacao: this.selSala.salaPesAtualizacao,
      salaDtAtualizacao: this.selSala.salaDtAtualizacao,
      salaUnidade: this.selUnidade
    };
  }

  buscarUnidade() {

    let unidade = this.listUnidades.find(uni => uni.uniId == this.selNumeroUnidade);
    this.selUnidade = unidade != null ? unidade : null;
  }

  // Reload na tela para recarregar os campos
  limpar() {

    location.reload()
  }

  fechar() {
    this.router.navigate(['/home']);
  }

  next() {
    this.agendamento.emit(this.montarAgendamento());

    this.stepper.selected.completed = true;
    this.stepper.next();
  }
}
