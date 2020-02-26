import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EquipamentosComponent } from './equipamentos.component';

const routes: Routes = [
    {
        path: '', component: EquipamentosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EquipamentosRoutingModule {
}
