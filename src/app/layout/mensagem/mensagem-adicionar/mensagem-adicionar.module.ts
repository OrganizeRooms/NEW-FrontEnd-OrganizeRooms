import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagemAdicionarRoutingModule } from './mensagem-adicionar-routing.module';
import { MensagemAdicionarComponent } from './mensagem-adicionar.component';
import { PageHeaderModule } from 'src/app/shared/_components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Date Picker
import { MatFormFieldModule, MatCheckboxModule, MatInputModule, MatDatepickerModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MensagemAdicionarRoutingModule,
        PageHeaderModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        MensagemAdicionarComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class MensagemAdicionarModule { }
