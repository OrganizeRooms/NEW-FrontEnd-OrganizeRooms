import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableDataComponent } from './table-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatTableModule,
        MatPaginatorModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        MatSortModule
    ],
    declarations: [TableDataComponent],
    exports: [TableDataComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class TableDataModule { }
