import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoasAdicionarComponent } from './pessoas-adicionar.component';

const routes: Routes = [
    {
        path: '', component: PessoasAdicionarComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PessoasAdicionarRoutingModule {
}
