import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EquipamentosAdicionarComponent } from './equipamentos-adicionar.component';

const routes: Routes = [
    {
        path: '', component: EquipamentosAdicionarComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EquipamentosAdicionarRoutingModule {
}
