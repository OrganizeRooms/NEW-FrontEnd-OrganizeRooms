import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';

// Date Picker
import { NgbDatepickerI18n, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter, CustomDatepickerI18n, I18n } from 'src/app/shared/utils/datepicker';
import { Agendamento } from 'src/app/shared/_models';

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

    agendamento: Agendamento;

    constructor(private router: Router) { }

    ngOnInit() { }

    ngOnDestroy() { this.agendamento = null; }

    getAgendamento($event: Agendamento) {

        this.agendamento = $event;
    }

    // Reload na tela para recarregar os campos
    limpar() { location.reload() }

    fechar() { this.router.navigate(['/home']); }
}