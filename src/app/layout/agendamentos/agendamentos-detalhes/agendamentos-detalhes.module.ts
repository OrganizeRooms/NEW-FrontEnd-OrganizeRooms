import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentosDetalhesRoutingModule } from './agendamentos-detalhes-routing.module';
import { AgendamentosDetalhesComponent } from './agendamentos-detalhes.component';
import { PageHeaderModule } from 'src/app/shared/_components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Component Material Angular
import {
    MatFormFieldModule, MatCheckboxModule, MatInputModule, MatSelectModule, MatTableModule, MatPaginatorModule,
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        AgendamentosDetalhesRoutingModule,
        PageHeaderModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AgendamentosDetalhesComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AgendamentosDetalhesModule { }
