import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { FormGroup, Validators } from '@angular/forms';
import { Agendamento, Pessoa, Equipamento, Participante, ReservaEquipamento } from 'src/app/shared/_models';
import { SelecionarEquipamentosComponent, SelecionarPessoasComponent } from '../../components/agendamento';
import { AgendamentoController } from 'src/app/shared';

@Component({
    selector: 'app-agendamentos-detalhes',
    templateUrl: './agendamentos-detalhes.component.html',
    styleUrls: ['./agendamentos-detalhes.component.scss'],
    animations: [routerTransition()],
})

export class AgendamentosDetalhesComponent extends AgendamentoController implements OnInit, OnDestroy {

    permissao: string;
    pessoaLogada: Pessoa;
    selAgendamento: Agendamento;
    selUnidade: number;
    formAgendamento: FormGroup;
    ageParticipantes: Participante[];
    ageEquipamentos: ReservaEquipamento[];
    selAgeStatus: string;

    pessoasSelecionadas: Pessoa[];
    equipamentosSelecionados: Equipamento[];

    ngOnInit() {
        this.selAgendamento = this.organizeRoomsService.getValue()

        if (this.selAgendamento != null) {
            this.criarFormulario();
            this.carregarListas();

            this.permissao = this.sessionStorageService.getValue().pessoa.pesPermissao;
            this.pessoaLogada = this.sessionStorageService.getValue().pessoa
        }
    }

    ngOnDestroy() {
        this.organizeRoomsService.setValue(null)
    }


    abrirModalEquipamentos() {

        const modalRef = this.modalService.open(SelecionarEquipamentosComponent);
        modalRef.componentInstance.agendamento = this.selAgendamento;

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

    criarFormulario() {
        if (this.selAgendamento != null) {
            this.formAgendamento = this.formBuilder.group({
                ageId: [this.selAgendamento.ageId],
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

    verificarStatus() {
        var retorno = false
        if (this.selAgeStatus == 'EM ANDAMENTO' || this.selAgeStatus == 'AGENDADO') {
            retorno = true
        }
        return retorno
    }

    corStatus(status: string): string {

        var retorno: string;
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

        return '';
    }

    atualizarReserva(status: string) {

        this.agendamentoService.atualizar(this.montarAgendamento()).subscribe(ret => {
            if (ret.data != null) {
                alert('Agendamento Alterado com Sucesso!');
            } else {
                alert('Não foi possível Atualizar o Agendamento! Tente novamente.');
            }
        });

        if (this.pessoasSelecionadas.length > 0) {
            this.inserirParticipantes(
                this.montaArrayParticipantes(this.pessoasSelecionadas, this.selAgendamento.ageId),
                this.selAgendamento
            );
        }

        if (this.equipamentosSelecionados.length > 0) {
            this.inserirReservasEquipamento(
                this.montaArrayReservaEquipamento(this.equipamentosSelecionados, this.selAgendamento.ageId))
        }
    }

    montarAgendamento(): Agendamento {
        return {
            ageId: this.selAgendamento.ageId,
            ageAssunto: this.formAgendamento.value.ageAssunto,
            ageDescricao: this.formAgendamento.value.ageDescricao,
            ageSala: this.selAgendamento.ageSala,
            agePesResponsavel: this.selAgendamento.agePesResponsavel,
            ageStatus: status == '' ? this.selAgeStatus : status,
            ageData: this.selAgendamento.ageData,
            ageHoraInicio: this.selAgendamento.ageHoraInicio,
            ageHoraFim: this.selAgendamento.ageHoraFim,
            agePesCadastro: this.selAgendamento.agePesCadastro,
            agePesAtualizacao: this.sessionStorageService.getValue().pessoa.pesId,
            ageDtCadastro: this.selAgendamento.ageDtCadastro,
            ageDtAtualizacao: new Date(),
            // Atributos que não são alterados e possuem trava no BackEnd
            ageEquipamentos: null,
            ageParticipantes: null
        };
    }

    excluirParticipante(participante: Participante) {

        this.deletarParticipante(participante, this.selAgendamento);
    }

    excluirEquipamento(reserva: ReservaEquipamento) {

        this.deletarReservaEquipamento(reserva);
    }
}
