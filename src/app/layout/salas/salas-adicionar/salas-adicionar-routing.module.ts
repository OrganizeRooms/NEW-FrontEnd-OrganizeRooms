import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalasAdicionarComponent } from './salas-adicionar.component';

const routes: Routes = [
    {
        path: '', component: SalasAdicionarComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SalasAdicionarRoutingModule {
}
