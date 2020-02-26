import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoasImportarRoutingModule } from './pessoas-importar-routing.module';
import { PessoasImportarComponent } from './pessoas-importar.component';
import { PageHeaderModule } from '../../../shared';

@NgModule({
    imports: [
        CommonModule,
        PessoasImportarRoutingModule,
        PageHeaderModule
    ],
    declarations: [
        PessoasImportarComponent
    ]
})
export class PessoasImportarModule { }
