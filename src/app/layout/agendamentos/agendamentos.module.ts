import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { AgendamentosRoutingModule } from './agendamentos-routing.module';
import { AgendamentosComponent } from './agendamentos.component';
import { PageHeaderModule } from 'src/app/shared/_components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Component Material Angular
import {
    MatCheckboxModule, MatInputModule, MatDatepickerModule, MatSelectModule, MatTableModule, MatPaginatorModule, MatSortModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        AgendamentosRoutingModule,
        PageHeaderModule,
        MatTableModule,
        MatPaginatorModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        MatSortModule,
        MatDatepickerModule,
        MatSelectModule,
        MatInputModule
    ],
    declarations: [
        AgendamentosComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AgendamentosModule { }
