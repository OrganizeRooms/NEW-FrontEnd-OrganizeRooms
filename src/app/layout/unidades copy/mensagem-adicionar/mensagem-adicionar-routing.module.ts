import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MensagemAdicionarComponent } from './mensagem-adicionar.component';

const routes: Routes = [
    {
        path: '', component: MensagemAdicionarComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MensagemAdicionarRoutingModule {
}
