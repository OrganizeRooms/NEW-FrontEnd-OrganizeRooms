import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendamentosDetalhesComponent } from './agendamentos-detalhes.component';

const routes: Routes = [
    {
        path: '', component: AgendamentosDetalhesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AgendamentosDetalhesRoutingModule {
}
