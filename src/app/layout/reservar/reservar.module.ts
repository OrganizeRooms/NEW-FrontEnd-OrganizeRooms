import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReservarRoutingModule } from './reservar-routing.module';
import { ReservarComponent } from './reservar.component';
import { PageHeaderModule } from 'src/app/shared/_components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Component Material Angular
import {
    MatStepperModule, MatFormFieldModule, MatCheckboxModule, MatInputModule, MatDatepickerModule, MatSelectModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatRadioModule
} from '@angular/material';

import { VerificarDisponibilidadeComponent } from './verificar-disponibilidade/verificar-disponibilidade.component';
import { AgendarComponent } from './agendar/agendar.component';
import { SelecionarEquipamentosModule, SelecionarPessoasModule, SelecionarEquipamentosComponent, SelecionarPessoasComponent } from '../components/agendamento';

@NgModule({
    imports: [
        CommonModule,
        ReservarRoutingModule,
        PageHeaderModule,
        SelecionarEquipamentosModule,
        SelecionarPessoasModule,
        MatStepperModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatRadioModule,
        NgbModule
    ],
    declarations: [
        ReservarComponent,
        VerificarDisponibilidadeComponent,
        AgendarComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    entryComponents: [
        VerificarDisponibilidadeComponent,
        AgendarComponent,
        SelecionarEquipamentosComponent,
        SelecionarPessoasComponent
    ]
})
export class ReservarModule { }
