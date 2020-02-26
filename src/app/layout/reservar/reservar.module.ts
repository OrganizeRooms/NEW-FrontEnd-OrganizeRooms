import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReservarRoutingModule } from './reservar-routing.module';
import { ReservarComponent } from './reservar.component';
import { PageHeaderModule } from '../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Component Material Angular
import {
    MatStepperModule, MatFormFieldModule, MatCheckboxModule, MatInputModule, MatDatepickerModule, MatSelectModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatRadioModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        ReservarRoutingModule,
        PageHeaderModule,
        MatStepperModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatRadioModule,
        NgbModule
    ],
    declarations: [
        ReservarComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class ReservarModule { }
