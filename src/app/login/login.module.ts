import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModalComponent } from './login-modal/login-modal.component';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule
    ],
    declarations: [
        LoginComponent,
        LoginModalComponent
    ],
    entryComponents: [LoginModalComponent]
})
export class LoginModule { }
