import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-stat',
    templateUrl: './stat.component.html',
    styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
    @Input() bgClass: string;
    @Input() icon: string;
    @Input() count: number;
    @Input() label: string;
    @Input() data: number;
    @Output() event: EventEmitter<any> = new EventEmitter();

    listAgendamentos: any[];

    constructor() { }

    ngOnInit() {
        this.carregarAgendamentos();
    }


    carregarAgendamentos() {
        this.listAgendamentos = [
            {id: 1, sala:'Sala de Reunião 3', assunto: 'Montar Kanban', hrInicio: '08:00', hrFim: '08:30', status: 'Agendado'},
            {id: 1, sala:'Sala de Reunião 2', assunto: 'Novos preços Kanban', hrInicio: '10:00', hrFim: '11:30', status: 'Agendado'},
            {id: 1, sala:'Sala de Reunião 3', assunto: 'Montar Kanban', hrInicio: '08:00', hrFim: '08:30', status: 'Agendado'}
        ]

    }
}
