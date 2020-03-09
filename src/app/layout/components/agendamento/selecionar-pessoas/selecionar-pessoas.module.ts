import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SelecionarPessoasComponent } from './selecionar-pessoas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatSelectModule, MatTableModule, MatPaginatorModule, MatFormFieldModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        NgbModule
    ],
    declarations: [
        SelecionarPessoasComponent
    ],
    exports: [
        SelecionarPessoasComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class SelecionarPessoasModule { }
