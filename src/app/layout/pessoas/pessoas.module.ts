import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoasComponent } from './pessoas.component';
import { PageHeaderModule } from '../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        PessoasRoutingModule,
        PageHeaderModule,
        MatTableModule,
        MatPaginatorModule,
        FormsModule,
        ReactiveFormsModule,
        MatSortModule,
        MatCheckboxModule
    ],
    declarations: [
        PessoasComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class PessoasModule { }
