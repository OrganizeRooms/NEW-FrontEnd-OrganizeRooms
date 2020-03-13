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
import { SelecionarEquipamentosComponent, SelecionarPessoasComponent, SelecionarPessoasModule, SelecionarEquipamentosModule 
} from '../../components/agendamento';

@NgModule({
    imports: [
        CommonModule,
        AgendamentosDetalhesRoutingModule,
        PageHeaderModule,
        SelecionarEquipamentosModule,
        SelecionarPessoasModule,
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
    ],
    entryComponents: [
        SelecionarEquipamentosComponent,
        SelecionarPessoasComponent
    ]
})
export class AgendamentosDetalhesModule { }
