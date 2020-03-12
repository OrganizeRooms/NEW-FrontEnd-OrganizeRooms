import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipamentosAdicionarRoutingModule } from './equipamentos-adicionar-routing.module';
import { EquipamentosAdicionarComponent } from './equipamentos-adicionar.component';
import { PageHeaderModule } from 'src/app/shared/_components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Component Material Angular
import {
    MatFormFieldModule, MatCheckboxModule, MatInputModule, MatDatepickerModule, MatSelectModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        EquipamentosAdicionarRoutingModule,
        PageHeaderModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule
    ],
    declarations: [
        EquipamentosAdicionarComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class EquipamentosAdicionarModule { }
