import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MensagemComponent } from './mensagem.component';

const routes: Routes = [
    {
        path: '', component: MensagemComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MensagemRoutingModule {
}
