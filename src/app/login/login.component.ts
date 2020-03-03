import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../router.animations';

import { JwtAuthentication } from '../shared/_models';
import { AuthenticationController } from '../shared/_controllers';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from './login-modal/login-modal.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    protected loading = false;
    protected loginForm: FormGroup;
    private creds: JwtAuthentication;
    
    constructor(
        private formBuilder: FormBuilder,
        private authenticationController: AuthenticationController,
        private modalService: NgbModal
    ) { }

    ngOnInit() {
        this.creds = this.authenticationController.montarNovoAuthentication();
        this.criarFormulario()
    }

    criarFormulario() {
        this.loginForm = this.formBuilder.group({
            pesEmail: null,
            pesSenha: null
        });
    }

    validarCredenciais() {
        if (this.loginForm.value.pesEmail == null || this.loginForm.value.pesEmail == ''
            || this.loginForm.value.pesSenha == null || this.loginForm.value.pesSenha == '') {
            alert("Informe Credencias de Acesso Válidas!")

        } else {
            if (this.loginForm.value.pesSenha == 'senha') {
                this.open();

                this.loginForm = this.formBuilder.group({
                    pesEmail: [this.loginForm.value.pesEmail, { updateOn: 'submit' }],
                    pesSenha: [null, { updateOn: 'submit' }]
                });
            } else {
                this.creds.pesEmail = this.loginForm.value.pesEmail;
                this.creds.pesSenha = this.loginForm.value.pesSenha;
                this.logar();
            }
        }
    }

    async logar() {
        this.loading = true;
        let retorno = await this.authenticationController.autenticar(this.creds)

        if (!retorno) {
            this.showError()
        }
    }

    deslogar() {
        this.authenticationController.deslogar();
    }

    showError() {
        alert('Credenciais Incorretas! Informe Novamente.');
    }

    open() {
        const modalRef = this.modalService.open(LoginModalComponent);
        modalRef.componentInstance.email = this.loginForm.value.pesEmail;
    }
}