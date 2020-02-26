import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoasImportarComponent } from './pessoas-importar.component';

const routes: Routes = [
    {
        path: '', component: PessoasImportarComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PessoasImportarRoutingModule {
}
