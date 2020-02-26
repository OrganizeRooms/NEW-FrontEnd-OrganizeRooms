import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalasComponent } from './salas.component';

const routes: Routes = [
    {
        path: '', component: SalasComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SalasRoutingModule {
}
