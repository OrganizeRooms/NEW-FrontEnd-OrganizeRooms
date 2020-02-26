import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipamentosRoutingModule } from './equipamentos-routing.module';
import { EquipamentosComponent } from './equipamentos.component';
import { PageHeaderModule } from '../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        EquipamentosRoutingModule,
        PageHeaderModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule
    ],
    declarations: [
        EquipamentosComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class EquipamentosModule { }
