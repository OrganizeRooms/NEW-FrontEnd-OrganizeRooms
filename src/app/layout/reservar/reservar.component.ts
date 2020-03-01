import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
// Date Picker
import {
    NgbDateStruct, NgbDatepickerI18n, NgbModal,
    NgbDateParserFormatter, NgbCalendar
} from '@ng-bootstrap/ng-bootstrap';
import { I18n, CustomDatepickerI18n, NgbDateCustomParserFormatter } from 'src/app/shared/utils';
import {
    UnidadeService, SalaService, SessionStorageService, PessoaService, EquipamentoService, AgendamentoService, NotificacaoService
} from 'src/app/shared/_services';
import {
    Agendamento, Pessoa, Equipamento, Participante, AgendamentoContext, Notificacao, EnviaEmail
} from 'src/app/shared/_models';
import { Router } from '@angular/router';
import { ReservaEquipamento } from 'src/app/shared/_models/reservaEquipamento';

// Metodos
//import { montarStringDataHora, montarStringDataEng, montarDataHora } from 'src/app/shared/utils';

@Component({
    selector: 'app-reservar',
    templateUrl: './reservar.component.html',
    styleUrls: ['./reservar.component.scss'],
    animations: [routerTransition()],
    providers: [
        I18n,
        { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }, // define custom NgbDatepickerI18n provider
        { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter } // define custom Date Format provider
    ]
})
export class ReservarComponent implements OnInit, OnDestroy {

    // Outros
    today;

    // Verificação de Disponibilidade e Seleção da Sala
    listUnidades;
    selUnidade = null;//= new FormControl(this.storageService.getLocalUser().pessoa.pesUnidade);
    lotacao;
    data: NgbDateStruct;
    horaInicio = { hour: 0, minute: 0, second: 0 };
    horaFim = { hour: 0, minute: 0, second: 0 };
    listSalas;
    selSala; // Sala Selecionada

    filtrarValido: Boolean;
    apareceFiltrar = true;

    // Agendamento
    formAgendar: FormGroup;
    responsavel;
    agendado = false;

    // Modal Participantes
    displayedColumnsParticipantes: string[] = ['selecionar', 'pesNome', 'pesUnidade', 'obrigatorio'];
    listPessoas = new MatTableDataSource<any>();
    pessoasSelecionadas = new SelectionModel<Pessoa>(true, []);

    filtrosModalPartic: FormGroup;

    // Modal Equipamentos
    displayedColumnsEquipamentos: string[] = ['selecionar', 'equNome', 'equDescricao'];
    listEquipamentos = new MatTableDataSource<any>();
    equipamentosSelecionados = new SelectionModel<Equipamento>(true, []);

    filtrosModalEquip: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private calendar: NgbCalendar,
        private modal: NgbModal,
        private router: Router,
        private unidadeService: UnidadeService,
        
        private salaService: SalaService,
        private agendamentoService: AgendamentoService,
        private NotificacaoService: NotificacaoService,
        private PessoaService: PessoaService,
        private equipamentoService: EquipamentoService
    ) { }

    ngOnInit() {
        //  this.carregarSalas();
        this.today = this.calendar.getToday()
        this.data = this.today;
        this.responsavel = SessionStorageService.getSessionUser().pessoa;

        this.carregarUnidades();
        this.selUnidade = SessionStorageService.getSessionUser().pessoa.pesUnidade.uniId
        this.criarFormularioAgendamento();
    }

    ngOnDestroy() {
        this.formAgendar = null;
        this.listUnidades = null;
        this.data = null;
        this.selUnidade = null
        this.lotacao = null;
    }

    // Inicio Métodos Passo 1 - Verificação
    carregarUnidades() {
        this.unidadeService.buscarUnidadesAtivas().subscribe(ret => {
            this.listUnidades = ret.data;
        });
    }

    filtrarSalas() {
        this.filtrarValido = this.verificarCampos();

        if (this.filtrarValido) {

            var dataHoraInicio = this.montarStringDataHora(this.data, this.horaInicio)
            var dataHoraFim = this.montarStringDataHora(this.data, this.horaFim)

            var nLotacao;
            if (!this.lotacao) {
                nLotacao = 0;
            } else {
                nLotacao = this.lotacao
            }

            var agendamentoContext: AgendamentoContext = {
                idUnidade: this.selUnidade,
                lotacao: nLotacao,
                dataAgendamento: this.montarStringDataEng(this.data),
                dataInicial: dataHoraInicio,
                dataFinal: dataHoraFim,
                idParticipante: null,
                idSala: null
            }

            this.salaService.buscarSalasDisponiveis(agendamentoContext).subscribe(ret => {
                if (ret.data != null && ret.data != '') {
                    this.listSalas = ret.data;
                } else {
                    this.listSalas = '';
                }
            });

            this.apareceFiltrar = false;
        }
    }

    // Reload na tela para recarregar os campos
    limpar() {
        //window.location.reload()

        location.reload()
    }

    fechar() {
        this.router.navigate(['/home']);
    }

    // Vai para o próximo passo
    next(stepper) {
        this.carregarEquipamentos();
        this.carregarPessoas();

        this.buscarUnidade()

        // Completa o Passo
        stepper.selected.completed = true;
        // Vai para o Próximo
        stepper.next();
    }

    buscarUnidade() {
        this.listUnidades.forEach(unidade => {
            if (unidade.uniId == this.selUnidade) {
                this.selUnidade = unidade
            }
        });
    }

    // Verificação dos Campos OBRIGATÓRIOS da Verificação de Disponibilidade das Salas
    verificarCampos(): Boolean {

        var mfiltrarValido = false;

        if (!this.selUnidade) {
            alert('Informe a Unidade!')

        } else if (!this.data) {
            alert('Informe uma Data!')

        } /*else if (this.horaFim.hour != 0 && this.horaFim.minute >= 0
            && this.horaInicio.hour == 0 && this.horaInicio.minute == 0) {
            alert('Informe uma Hora Inicio!')

        } else if (this.horaInicio.hour != 0 && this.horaInicio.minute >= 0
            && this.horaFim.hour == 0 && this.horaFim.minute == 0) {
            alert('Informe uma Hora Fim!')

        }*/ else if (this.horaInicio.hour == this.horaFim.hour && this.horaInicio.minute == this.horaFim.minute) {
            alert('Informe Horas Diferentes!')

        }/* else if ((this.horaInicio.hour >= this.horaFim.hour && this.horaInicio.minute >= this.horaFim.minute)
            && (this.horaInicio.hour >= 0 && this.horaInicio.minute >= 0 && this.horaFim.hour != 0 && this.horaFim.minute >= 0)) {
            alert('Informe uma "Hora Fim" MAIOR que a "Hora Inicio"!')

        }*/ else {
            mfiltrarValido = true
        }
        return mfiltrarValido
    }
    // Fim Métodos Passo 1 - Verificação

    // Inicio Métodos Passo 2 - Realizar Agendamento
    criarFormularioAgendamento() {
        this.formAgendar = this.formBuilder.group({
            ageAssunto: [null, Validators.required],
            ageDescricao: [null],
        });
    }

    abrirModal(modal) {
        this.modal.open(modal)
    }

    // temporario
    carregarPessoas() {
        this.PessoaService.buscarTodasPessoas().subscribe(ret => {
            this.listPessoas.data = ret.data
        });
    }

    carregarEquipamentos() {
        var dataHoraInicio = this.montarStringDataHora(this.data, this.horaInicio)
        var dataHoraFim = this.montarStringDataHora(this.data, this.horaFim)

        var agendamentoContext: AgendamentoContext = {
            idUnidade: this.selUnidade,
            lotacao: 0,
            dataAgendamento: this.montarStringDataEng(this.data),
            dataInicial: dataHoraInicio,
            dataFinal: dataHoraFim,
            idParticipante: null,
            idSala: null
        }

        this.equipamentoService.buscarEquipamentosDisponiveis(agendamentoContext).subscribe(ret => {
            if (ret.data != null && ret.data != '') {
                this.listEquipamentos.data = ret.data;
            }
        })
    }

    realizarReserva(stepper) {

        var nAgeData = this.montarStringDataEng(this.data)
        var dataHoraInicio = new Date(this.montarStringDataHora(this.data, this.horaInicio))
        var dataHoraFim = new Date(this.montarStringDataHora(this.data, this.horaFim))

        var nAgeParticipantes: Array<Participante>;
        var nAgeEquipamentos: Array<ReservaEquipamento>;
        if (this.pessoasSelecionadas.hasValue) {
            nAgeParticipantes = this.montaArrayParticipantes();
        } else {
            nAgeParticipantes = null;
        }

        if (this.equipamentosSelecionados.hasValue) {
            nAgeEquipamentos = this.montaArrayReservaEquipamento();
        } else {
            nAgeEquipamentos = null;
        }

        const agendamento: Agendamento = {
            ageId: null,
            ageAssunto: this.formAgendar.value.ageAssunto,
            ageDescricao: this.formAgendar.value.ageDescricao,
            ageSala: this.selSala,
            agePesResponsavel: this.responsavel,
            ageStatus: 'AGENDADO',
            ageData: new Date(nAgeData),
            ageHoraInicio: dataHoraInicio,
            ageHoraFim: dataHoraFim,
            agePesCadastro: SessionStorageService.getSessionUser().pessoa.pesId,
            agePesAtualizacao: SessionStorageService.getSessionUser().pessoa.pesId,
            ageDtCadastro: new Date(),
            ageDtAtualizacao: new Date(),
            ageEquipamentos: nAgeEquipamentos,
            //ageParticipantes: this.pessoasSelecionadas.selected
            ageParticipantes: nAgeParticipantes
        }

        this.agendamentoService.addAgendamento(agendamento).subscribe(ret => {
            if (ret.data != null) {
                // Completa o Passo
                stepper.selected.completed = true;
                // Vai para o Próximo
                stepper.next();
                this.agendado = true;
            } else {
                alert('Não foi possível Finalizar o Agendamento! Tente novamente.');
            }
        });

        this.notificarParticipantes(nAgeParticipantes);
    }

    montaArrayParticipantes(): Array<Participante> {

        var participantes = new Array<Participante>()
        this.pessoasSelecionadas.selected.forEach(pessoa => {

            var nParTipo;
            if (pessoa.participanteObrigatorio) {
                nParTipo = 2
            } else {
                nParTipo = 1
            }

            /*var nParConfirmado;
            if (pessoa.pesId == this.responsavel.pesId) {
                nParConfirmado = true
            } else {
                nParConfirmado = null
            }*/

            var part: Participante = {
                parId: null,
                parTipo: nParTipo,
                // parConfirmado: nParConfirmado,
                parConfirmado: null,
                parPessoa: pessoa,
                parAgendamento: null,
            }
            participantes.push(part)
        });

        return participantes
    }

    montaArrayReservaEquipamento(): Array<ReservaEquipamento> {

        var reservas = new Array<ReservaEquipamento>()
        this.equipamentosSelecionados.selected.forEach(equip => {

            var reserva: ReservaEquipamento = {
                resId: null,
                equipamento: equip,
                agendamento: null,
            }
            reservas.push(reserva)
        });

        return reservas
    }

    notificarParticipantes(participantes) {
        var notificacoes = new Array<Notificacao>()

        var nMensagemPadrão = 'Você possui uma nova reunião na data '
            + this.montarStringDataPtBr(this.data)
            + ' no período das ' + this.montarStringHoraMinuto(this.horaInicio)
            + ' às ' + this.montarStringHoraMinuto(this.horaFim)
            + ' marcada por ' + this.responsavel.pesNome + '.'

        var nMensagemObrigatorio = 'Você é uma pessoa Obrigatória na nova reunião marcada por '
            + this.responsavel.pesNome + ' na data ' + this.montarStringDataPtBr(this.data)
            + ' no período das ' + this.montarStringHoraMinuto(this.horaInicio)
            + ' às ' + this.montarStringHoraMinuto(this.horaFim) + '.'

        var nAssunto = 'Nova Reunião Marcada por' + this.responsavel.pesNome

        participantes.forEach(part => {

            var mensagem
            if (part.parTipo == 1) {
                mensagem = nMensagemPadrão      // tipo 1 Normal
            } else {
                mensagem = nMensagemObrigatorio // tipo 2 obrigatorio
            }

            var enviaEmail: EnviaEmail = {
                destinatario: part.parPessoa.pesEmail, // email participante
                assunto: nAssunto,           // assunto do e-mail
                mensagem: mensagem          // mensagem do e-mail
            }

            var notificacao: Notificacao = {
                notId: null,
                notDescricao: mensagem,            /// mensagem enviada por e-mail
                notAtiva: true,
                notPessoa: part.parPessoa,                   // participante
                notPesCadastro: this.responsavel.pesId,
                notDtCadastro: new Date(),
                notPesAtualizacao: this.responsavel.pesId,
                notDtAtualizacao: new Date(),
                notEnviado: false,
                enviaEmail: enviaEmail
            }

            notificacoes.push(notificacao);
        });

        this.NotificacaoService.enviarEmail(notificacoes).subscribe(ret => {
            if (ret.data != null) {
                //
            }
        });
    }

    // ---- Inicio Métodos do Modal Participantes

    aplicarFiltroPart(valor: string) {
        this.listPessoas.filter = valor.trim().toLowerCase();
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelectedPart() {
        const numSelected = this.pessoasSelecionadas.selected.length;
        const numRows = this.listPessoas.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterTogglePart() {
        this.isAllSelectedPart() ?
            this.pessoasSelecionadas.clear() :
            this.listPessoas.data.forEach(rowPart => this.pessoasSelecionadas.select(rowPart));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabelPart(rowPart?: any): string {
        if (!rowPart) {
            return `${this.isAllSelectedPart() ? 'select' : 'deselect'} all`;
        }
        return `${this.pessoasSelecionadas.isSelected(rowPart) ? 'deselect' : 'select'} rowPart ${rowPart.position + 1}`;
    }
    // ---- Fim Métodos do Modal Participantes

    // ---- Inicio Métodos do Modal Equipamentos

    aplicarFiltroEquip(valor: string) {
        this.listEquipamentos.filter = valor.trim().toLowerCase();
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelectedEquip() {
        const numSelected = this.equipamentosSelecionados.selected.length;
        const numRows = this.listEquipamentos.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggleEquip() {
        this.isAllSelectedEquip() ?
            this.equipamentosSelecionados.clear() :
            this.listEquipamentos.data.forEach(rowEquip => this.equipamentosSelecionados.select(rowEquip));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabelEquip(rowEquip?: any): string {
        if (!rowEquip) {
            return `${this.isAllSelectedEquip() ? 'select' : 'deselect'} all`;
        }
        return `${this.equipamentosSelecionados.isSelected(rowEquip) ? 'deselect' : 'select'} rowEquip ${rowEquip.position + 1}`;
    }
    // ---- Fim Métodos do Modal Equipamentos


    // Pega Data e Hora e retorna um DateTime
    montarDataHora(data, hora): Date {
        var dataHora = new Date(data.year, data.month, data.day, hora.hour, hora.minute, hora.second);
        return dataHora;
    }

    montarStringDataHora(parData, parHora) {

        var mes = this.validarData(parData, 1);
        var dia = this.validarData(parData, 2);
        var hora = this.validarData(parHora, 3);
        var minuto = this.validarData(parHora, 4);

        var dataHora = parData.year + '/' + mes + '/' + dia + ' ' + hora + ':' + minuto + ':00';
        return dataHora;
    }

    montarStringDataEng(data) {

        var mes = this.validarData(data, 1);
        var dia = this.validarData(data, 2);

        var stringData = data.year + '/' + mes + '/' + dia
        return stringData
    }

    montarStringDataPtBr(data) {

        var mes = this.validarData(data, 1);
        var dia = this.validarData(data, 2);

        var stringData = dia + '/' + mes + '/' + data.year
        return stringData
    }

    montarStringHoraMinuto(horaMinuto) {

        var hora = this.validarData(horaMinuto, 3);
        var minuto = this.validarData(horaMinuto, 4);

        var stringHoraMinuto = hora + ':' + minuto
        return stringHoraMinuto
    }

    validarData(valor, tipoValor) {

        var mes;        /// TIPO 1
        var dia;        /// TIPO 2
        var hora;       /// TIPO 3
        var minuto;     /// TIPO 4

        // Mes
        if (tipoValor == 1) {
            if (valor.month < 10) {
                mes = '0' + valor.month
            } else {
                mes = valor.month
            }
            return mes
        }

        // Dia
        if (tipoValor == 2) {
            if (valor.day < 10) {
                dia = '0' + valor.day
            } else {
                dia = valor.day
            }
            return dia
        }

        // Hora
        if (tipoValor == 3) {
            if (valor.hour < 10) {
                hora = '0' + valor.hour
            } else {
                hora = valor.hour
            }
            return hora
        }

        if (tipoValor == 4) {
            if (valor.minute < 10) {
                minuto = '0' + valor.minute
            } else {
                minuto = valor.minute
            }
            return minuto
        }
    }

    // Fim Métodos Passo 2 - Realizar Agendamento
}