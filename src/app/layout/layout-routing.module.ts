import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../shared';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'prefix' },
            { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
            { path: 'pessoas', loadChildren: () => import('./pessoas/pessoas.module').then(m => m.PessoasModule), canActivate: [AuthGuard] },
            { path: 'pessoas-adicionar', loadChildren: () => import('./pessoas/pessoas-adicionar/pessoas-adicionar.module').then(m => m.PessoasAdicionarModule), canActivate: [AuthGuard] },
            { path: 'pessoas-importar', loadChildren: () => import('./pessoas/pessoas-importar/pessoas-importar.module').then(m => m.PessoasImportarModule), canActivate: [AuthGuard] },
            { path: 'salas', loadChildren: () => import('./salas/salas.module').then(m => m.SalasModule), canActivate: [AuthGuard] },
            { path: 'salas-adicionar', loadChildren: () => import('./salas/salas-adicionar/salas-adicionar.module').then(m => m.SalasAdicionarModule), canActivate: [AuthGuard] },
            { path: 'unidades', loadChildren: () => import('./unidades/unidades.module').then(m => m.UnidadesModule), canActivate: [AuthGuard] },
            { path: 'unidades-adicionar', loadChildren: () => import('./unidades/unidades-adicionar/unidades-adicionar.module').then(m => m.UnidadesAdicionarModule), canActivate: [AuthGuard] },
            { path: 'reservar', loadChildren: () => import('./reservar/reservar.module').then(m => m.ReservarModule), canActivate: [AuthGuard] },
            { path: 'equipamentos', loadChildren: () => import('./equipamentos/equipamentos.module').then(m => m.EquipamentosModule), canActivate: [AuthGuard] },
            { path: 'equipamentos-adicionar', loadChildren: () => import('./equipamentos/equipamentos-adicionar/equipamentos-adicionar.module').then(m => m.EquipamentosAdicionarModule), canActivate: [AuthGuard] },
            { path: 'agendamentos', loadChildren: () => import('./agendamentos/agendamentos.module').then(m => m.AgendamentosModule), canActivate: [AuthGuard] },
            { path: 'agendamentos-detalhes', loadChildren: () => import('./agendamentos/agendamentos-detalhes/agendamentos-detalhes.module').then(m => m.AgendamentosDetalhesModule), canActivate: [AuthGuard] },
            { path: 'mensagens', loadChildren: () => import('./mensagem/mensagem.module').then(m => m.MensagemModule), canActivate: [AuthGuard] },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
