import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

import {
    AgendamentoService, AuthenticationService, EquipamentoService, NotificacaoService,
    ParticipanteService, PessoaService, SalaService, UnidadeService, MensagemService, ReservaEquipamentoService
} from 'src/app/shared/_services';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        NgbDropdownModule,
        NgbModule
    ],
    declarations: [
        LayoutComponent,
        SidebarComponent,
        HeaderComponent
    ],
    providers: [
        AgendamentoService,
        AuthenticationService,
        EquipamentoService,
        NotificacaoService,
        ParticipanteService,
        PessoaService,
        SalaService,
        UnidadeService,
        MensagemService,
        ReservaEquipamentoService
    ]
})
export class LayoutModule { }
