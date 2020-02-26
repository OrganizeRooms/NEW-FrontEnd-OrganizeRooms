import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalasAdicionarRoutingModule } from './salas-adicionar-routing.module';
import { SalasAdicionarComponent } from './salas-adicionar.component';
import { PageHeaderModule } from '../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Component Material Angular
import {
    MatFormFieldModule, MatCheckboxModule, MatInputModule, MatDatepickerModule, MatSelectModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        SalasAdicionarRoutingModule,
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
        SalasAdicionarComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SalasAdicionarModule { }
