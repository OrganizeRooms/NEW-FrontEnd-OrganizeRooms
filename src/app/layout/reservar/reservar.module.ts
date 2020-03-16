import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReservarRoutingModule } from './reservar-routing.module';
import { ReservarComponent } from './reservar.component';
import { PageHeaderModule } from 'src/app/shared/_components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Component Material Angular

import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';



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
