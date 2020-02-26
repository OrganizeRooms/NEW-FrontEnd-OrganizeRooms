import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalasRoutingModule } from './salas-routing.module';
import { SalasComponent } from './salas.component';
import { PageHeaderModule } from '../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        SalasRoutingModule,
        PageHeaderModule,
        MatTableModule,
        MatPaginatorModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        MatSortModule
    ],
    declarations: [
        SalasComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SalasModule { }
