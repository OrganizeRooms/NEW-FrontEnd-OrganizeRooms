import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnidadesAdicionarComponent } from './unidades-adicionar.component';

const routes: Routes = [
    {
        path: '', component: UnidadesAdicionarComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UnidadesAdicionarRoutingModule {
}
