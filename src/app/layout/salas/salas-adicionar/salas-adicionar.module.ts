import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalasAdicionarRoutingModule } from './salas-adicionar-routing.module';
import { SalasAdicionarComponent } from './salas-adicionar.component';
import { PageHeaderModule } from 'src/app/shared/_components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Component Material Angular
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
