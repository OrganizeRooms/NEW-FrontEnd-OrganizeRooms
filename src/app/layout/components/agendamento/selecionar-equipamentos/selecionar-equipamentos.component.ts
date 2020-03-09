import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import {  NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EquipamentoController, ConfSelectionModel, Equipamento, AgendamentoContext, Unidade, Agendamento, DateHelper } from 'src/app/shared';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-selecionar-equipamentos',
    templateUrl: './selecionar-equipamentos.component.html'
})
export class SelecionarEquipamentosComponent implements OnInit, OnDestroy {

    @Input() agendamento: Agendamento;
    @Output() equipamentosSelecionados = new EventEmitter<Equipamento[]>();

    displayedColumns = ['selecionar', 'equNome', 'equDescricao'];
    listEquipamentos = new MatTableDataSource<Equipamento>();
    selecionados = new SelectionModel<Equipamento>(true, []);
    filtrosModalEquip: FormGroup;
    confSelectionModelEquip = new ConfSelectionModel<Equipamento>(this.selecionados, this.listEquipamentos);

    constructor(
        private activeModal: NgbActiveModal,
        private equipamentoController: EquipamentoController
    ) { }

    ngOnInit() {
        this.carregarEquipamentos();
    }

    ngOnDestroy() {
        this.fechar();
    }

    async carregarEquipamentos() {
        this.listEquipamentos.data = await this.equipamentoController.buscarDisponiveis(this.montarAgendamentoContext());
    }

    montarAgendamentoContext(): AgendamentoContext {
        console.log('equipamentos = montarAgendamentoContext');

        console.log(this.agendamento);

        return {
            idUnidade: this.agendamento.ageSala.salaUnidade.uniId,
            lotacao: this.agendamento.ageSala.salaLotacao,
            dataAgendamento: DateHelper.montarStringDataEng(this.agendamento.ageData),
            dataInicial: DateHelper.montarStringDataHoraEng(this.agendamento.ageHoraInicio),
            dataFinal: DateHelper.montarStringDataHoraEng(this.agendamento.ageHoraFim),
            idParticipante: null,
            idSala: null
        }
    }

    fechar() {
        this.activeModal.close(this.selecionados);
    }

    aplicarFiltro(valor: string) {

        this.listEquipamentos.filter = valor.trim().toLowerCase();
    }

    isAllSelected(): boolean {

        return this.confSelectionModelEquip.isAllSelected();
    }

    masterToggle(): void {

        this.confSelectionModelEquip.masterToggle();
    }

    checkboxLabel(row?: any): string {

        return this.confSelectionModelEquip.checkboxLabel(row);
    }
}
