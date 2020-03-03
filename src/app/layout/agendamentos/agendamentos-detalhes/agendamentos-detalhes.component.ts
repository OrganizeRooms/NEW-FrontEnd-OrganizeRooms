import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {
    ParticipanteService, SessionStorageService, PessoaService, EquipamentoService,
    AgendamentoService, NotificacaoService, OrganizeRoomsService
} from 'src/app/shared/_services';
import {
    Agendamento, Pessoa, Equipamento, Participante, AgendamentoContext, Notificacao, EnviaEmail
} from 'src/app/shared/_models';
import { ReservaEquipamento } from 'src/app/shared/_models/reservaEquipamento';
import { ReservaEquipamentoService } from 'src/app/shared/_services/reservaEquipamento.service';

@Component({
    selector: 'app-agendamentos-detalhes',
    templateUrl: './agendamentos-detalhes.component.html',
    styleUrls: ['./agendamentos-detalhes.component.scss'],
    animations: [routerTransition()],
})

export class AgendamentosDetalhesComponent implements OnInit, OnDestroy {
    labelPosition = 'before';
    permissao;
    pessoaLogada;

    selAgendamento;
    selUnidade;
    formAgendamento: FormGroup;
    ageParticipantes;
    ageEquipamentos;
    selAgeStatus;

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
        private modal: NgbModal,
        // Services
        private organizeRoomsService: OrganizeRoomsService<Agendamento>,
        private PessoaService: PessoaService,
        private equipamentoService: EquipamentoService,
        private agendamentoService: AgendamentoService,
        private participanteService: ParticipanteService,
        private reservaEquipamentoService: ReservaEquipamentoService,
        private NotificacaoService: NotificacaoService,
        private sessionStorageService: SessionStorageService
    ) { }

    ngOnInit() {
        this.selAgendamento = this.organizeRoomsService.getValue()

        if (this.selAgendamento != null) {
            this.criarFormulario();
            this.carregarListas();
            this.carregarPessoas();
            this.carregarEquipamentos();

            this.permissao = this.sessionStorageService.getValue().pessoa.pesPermissao;
            this.pessoaLogada = this.sessionStorageService.getValue().pessoa
        }
    }

    ngOnDestroy() {
        this.organizeRoomsService.setValue(null)
    }

    abrirModal(modal) {
        this.modal.open(modal)
    }

    criarFormulario() {
        if (this.selAgendamento != null) {
            this.formAgendamento = this.formBuilder.group({
                ageId: [this.selAgendamento.ageId],
                ageAtiva: [this.selAgendamento.ageAtiva],
                ageData: [this.selAgendamento.ageData],
                ageAssunto: [this.selAgendamento.ageAssunto, Validators.compose([Validators.required])],
                ageDescricao: [this.selAgendamento.ageDescricao],
                ageDtCadastro: [this.selAgendamento.ageDtCadastro]
            });
            this.selAgeStatus = this.selAgendamento.ageStatus;
        }
    }

    carregarListas() {
        this.ageParticipantes = this.selAgendamento.ageParticipantes;
        this.ageEquipamentos = this.selAgendamento.ageEquipamentos;
    }

    // temporario
    carregarPessoas() {
        this.PessoaService.buscarTodos().subscribe(ret => {
            this.listPessoas.data = ret.data
        });
    }

    carregarEquipamentos() {

        var dataHoraInicio = this.montarStringDataHora(
            new Date(this.selAgendamento.ageHoraInicio),
            new Date(this.selAgendamento.ageHoraInicio))

        var dataHoraFim = this.montarStringDataHora(
            new Date(this.selAgendamento.ageHoraFim),
            new Date(this.selAgendamento.ageHoraFim))

        var agendamentoContext: AgendamentoContext = {
            idUnidade: this.selAgendamento.ageSala.salaUnidade.uniId,
            lotacao: 0,
            dataAgendamento: this.montarStringDataEng(new Date(this.selAgendamento.ageHoraFim)),
            dataInicial: dataHoraInicio,
            dataFinal: dataHoraFim,
            idParticipante: null,
            idSala: null
        }

        this.equipamentoService.buscarDisponiveis(agendamentoContext).subscribe(ret => {
            if (ret.data != null && ret.data != '') {
                this.listEquipamentos.data = ret.data;
            }
        })
    }

    verificarStatus() {
        var retorno = false
        if (this.selAgeStatus == 'EM ANDAMENTO' || this.selAgeStatus == 'AGENDADO') {
            retorno = true
        }
        return retorno
    }

    corStatus(status) {

        var retorno
        if (status == 'AGENDADO') {
            retorno = 'blue'
            return retorno
        }
        if (status == 'CANCELADO') {
            retorno = 'red'
            return retorno
        }

        if (status == 'CONCLUIDO') {
            retorno = 'green'
            return retorno
        }
    }

    atualizarReserva(status) {

        var nAgeStatus;

        if (status == '') {
            nAgeStatus = this.selAgeStatus
        } else {
            nAgeStatus = status
        }

        const agendamento: Agendamento = {
            ageId: this.selAgendamento.ageId,
            ageAssunto: this.formAgendamento.value.ageAssunto,
            ageDescricao: this.formAgendamento.value.ageDescricao,
            ageStatus: nAgeStatus,
            agePesAtualizacao: this.sessionStorageService.getValue().pessoa.pesId,
            ageDtAtualizacao: new Date(),
            // Atributos que não são alterados e possuem trava no BackEnd
            ageDtCadastro: null,
            ageSala: null,
            agePesResponsavel: null,
            ageData: null,
            ageHoraInicio: null,
            ageHoraFim: null,
            agePesCadastro: null,
            ageEquipamentos: null,
            ageParticipantes: null
        }

        this.agendamentoService.atualizar(agendamento).subscribe(ret => {
            if (ret.data != null) {
                alert('Agendamento Alterado com Sucesso!');
            } else {
                alert('Não foi possível Atualizar o Agendamento! Tente novamente.');
            }
        });

        var participantes;
        if (this.pessoasSelecionadas.hasValue()) {
            participantes = this.montaArrayParticipantes()
            this.inserirNovosParticipantes(participantes)
        }

        var equipamentos;
        if (this.equipamentosSelecionados.hasValue()) {
            equipamentos = this.montaArrayReservaEquipamento()
            this.inserirNovasReservasEquipamento(equipamentos)
        }
    }

    montaArrayParticipantes(): Array<Participante> {

        var participantes = new Array<Participante>()

        var agendamento: Agendamento = {
            ageId: this.selAgendamento.ageId,
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
        this.pessoasSelecionadas.selected.forEach(pessoa => {

            var nParTipo;
            if (pessoa.participanteObrigatorio) {
                nParTipo = 2
            } else {
                nParTipo = 1
            }

            var nParConfirmado;
            if (pessoa.pesId == this.selAgendamento.agePesResponsavel.pesId) {
                nParConfirmado = true
            } else {
                nParConfirmado = null
            }

            var part: Participante = {
                parId: null,
                parTipo: nParTipo,
                parConfirmado: nParConfirmado,
                parPessoa: pessoa,
                parAgendamento: agendamento
            }
            participantes.push(part)
        });

        return participantes
    }

    inserirNovosParticipantes(participantes) {
        this.participanteService.adicionarLista(participantes).subscribe(ret => {
            if (ret.data != null && ret.data != '') {
                this.notificarParticipantes(participantes)

            } else {
                alert('Participante(s) NÃO adicionado(s)! Tente Novamente!')
            }
        });
    }

    montaArrayReservaEquipamento(): Array<ReservaEquipamento> {

        var reservas = new Array<ReservaEquipamento>()

        var agendamento: Agendamento = {
            ageId: this.selAgendamento.ageId,
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
        this.equipamentosSelecionados.selected.forEach(equip => {

            var reserva: ReservaEquipamento = {
                resId: null,
                equipamento: equip,
                agendamento: agendamento,
            }
            reservas.push(reserva)
        });

        return reservas
    }

    inserirNovasReservasEquipamento(equipametos) {
        this.reservaEquipamentoService.adicionarLista(equipametos).subscribe(ret => {
            if (ret.data != null && ret.data != '') {
                //
            } else {
                alert('Equipamento(s) NÃO adicionado(s)! Tente Novamente!')
            }
        });
    }

    notificarParticipantes(participantes) {
        var notificacoes = new Array<Notificacao>()

        var nMensagemPadrão = 'Você possui uma nova reunião na data '
            + this.montarStringDataPtBr(new Date(this.selAgendamento.ageHoraInicio))
            + ' no período das ' + this.montarStringHoraMinuto(new Date(this.selAgendamento.ageHoraInicio))
            + ' às ' + this.montarStringHoraMinuto(new Date(this.selAgendamento.ageHoraFim))
            + ' marcada por ' + this.selAgendamento.agePesResponsavel.pesNome + '.'

        var nMensagemObrigatorio = 'Você é uma pessoa Obrigatória na nova reunião marcada por '
            + this.selAgendamento.agePesResponsavel.pesNome
            + ' na data ' + this.montarStringDataPtBr(new Date(this.selAgendamento.ageHoraInicio))
            + ' no período das ' + this.montarStringHoraMinuto(new Date(this.selAgendamento.ageHoraInicio))
            + ' às ' + this.montarStringHoraMinuto(new Date(this.selAgendamento.ageHoraFim)) + '.'

        var nAssunto = 'Nova Reunião Marcada por' + this.selAgendamento.agePesResponsavel.pesNome

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
                notPesCadastro: this.sessionStorageService.getValue().pessoa.pesId,
                notDtCadastro: new Date(),
                notPesAtualizacao: this.sessionStorageService.getValue().pessoa.pesId,
                notDtAtualizacao: new Date(),
                notEnviado: false,
                enviaEmail: enviaEmail
            }

            notificacoes.push(notificacao);
        });

        console.log(notificacoes)

        this.NotificacaoService.enviarEmail(notificacoes).subscribe(ret => {
            console.log(ret.data)
            if (ret.data != null) {
                //
            }
        });
    }

    excluirParticipante(participante) {
        this.participanteService.deletar(participante.parId).subscribe(ret => {
            if (ret.data != null && ret.data != '') {
                alert('Participante ' + participante.parPessoa.pesNome + " retirado da Reunião com Sucesso!\nRecarregue a página. ")
                this.notificarPartExcluido(participante);
            } else {
                alert('Erro ao retirar Participante ' + participante.parPessoa.pesNome)
            }
        });
    }

    excluirEquipamento(reserva) {
        this.reservaEquipamentoService.deletar(reserva.resId).subscribe(ret => {
            if (ret.data != null && ret.data != '') {
                alert('Equipamento ' + reserva.equipamento.equNome + " Removido com Sucesso!\nRecarregue a página. ")
            } else {
                alert('Erro ao retirar Equipamento ' + reserva.equipamento.equNome)
            }
        });
    }

    notificarPartExcluido(part) {
        var notificacoes = new Array<Notificacao>()

        var nMensagemExcluido = 'Você foi retirado da reunião marcada por ' + this.selAgendamento.agePesResponsavel.pesNome
            + ' na data ' + this.montarStringDataPtBr(new Date(this.selAgendamento.ageHoraInicio))
            + ' no período das ' + this.montarStringHoraMinuto(new Date(this.selAgendamento.ageHoraInicio))
            + ' às ' + this.montarStringHoraMinuto(new Date(this.selAgendamento.ageHoraFim)) + '.'

        var nAssunto = 'Retirado da Reunião Marcada por' + this.selAgendamento.agePesResponsavel.pesNome

        var enviaEmail: EnviaEmail = {
            destinatario: part.parPessoa.pesEmail,  // email participante
            assunto: nAssunto,                      // assunto do e-mail
            mensagem: nMensagemExcluido             // mensagem do e-mail
        }

        var notificacao: Notificacao = {
            notId: null,
            notDescricao: nMensagemExcluido,            // mensagem enviada por e-mail
            notAtiva: true,
            notPessoa: part.parPessoa,                   // participante
            notPesCadastro: this.sessionStorageService.getValue().pessoa.pesId,
            notDtCadastro: new Date(),
            notPesAtualizacao: this.sessionStorageService.getValue().pessoa.pesId,
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

    // ---- Inicio Métodos do Modal Participantes

    aplicarFiltroPart(valor: string) {
        this.listPessoas.filter = valor.trim().toLowerCase();
    }

    // **** Metodos do Select ******
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

    // **** Metodos do Select ******
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

    montarStringDataEng(data: Date) {

        var mes = this.validarData(data, 1);
        var dia = this.validarData(data, 2);

        var stringData = data.getFullYear() + '/' + mes + '/' + dia
        return stringData
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

    montarStringDataHora(parData, parHora) {

        var mes = this.validarData(parData, 1);
        var dia = this.validarData(parData, 2);
        var hora = this.validarData(parHora, 3);
        var minuto = this.validarData(parHora, 4);

        var dataHora = parData.getFullYear() + '/' + mes + '/' + dia + ' ' + hora + ':' + minuto + ':00';
        return dataHora;
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
