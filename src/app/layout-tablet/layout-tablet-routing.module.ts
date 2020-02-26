import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutTabletComponent } from './layout-tablet.component';
import { AuthGuard } from '../shared';

const routes: Routes = [
    {
        path: '',
        component: LayoutTabletComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'prefix' },
            { path: 'home', loadChildren: () => import('./home-tablet/home-tablet.module').then(m => m.HomeTabletModule), canActivate: [AuthGuard]  }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutTabletRoutingModule { }
