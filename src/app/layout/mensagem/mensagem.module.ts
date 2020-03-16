import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagemRoutingModule } from './mensagem-routing.module';
import { MensagemComponent } from './mensagem.component';
import { PageHeaderModule } from 'src/app/shared/_components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        MensagemRoutingModule,
        PageHeaderModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        MensagemComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class MensagemModule { }
