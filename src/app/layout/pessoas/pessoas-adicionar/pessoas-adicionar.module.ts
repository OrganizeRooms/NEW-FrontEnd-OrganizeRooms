import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoasAdicionarRoutingModule } from './pessoas-adicionar-routing.module';
import { PessoasAdicionarComponent } from './pessoas-adicionar.component';
import { PageHeaderModule } from '../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Component Material Angular
import {
    MatFormFieldModule, MatCheckboxModule, MatInputModule, MatDatepickerModule, MatSelectModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        PessoasAdicionarRoutingModule,
        PageHeaderModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatSelectModule
    ],
    declarations: [
        PessoasAdicionarComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class PessoasAdicionarModule { }
