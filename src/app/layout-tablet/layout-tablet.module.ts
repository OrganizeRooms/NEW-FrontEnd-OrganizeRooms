import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutTabletRoutingModule } from './layout-tablet-routing.module';
import { LayoutTabletComponent } from './layout-tablet.component';
import { HeaderTabletComponent } from './components/header-tablet/header-tablet.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutTabletRoutingModule,
        NgbDropdownModule,
        NgbModule
    ],
    declarations: [
        LayoutTabletComponent,
       // SidebarComponent,
        HeaderTabletComponent
    ],
    providers: [
    ]
})
export class LayoutTabletModule { }
