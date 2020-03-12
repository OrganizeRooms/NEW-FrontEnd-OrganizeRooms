import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../router.animations';

import { JwtAuthentication, Response, Pessoa, montarNovoAuthentication } from '../shared/_models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { AuthenticationService } from '../shared';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    loading = false;
    loginForm: FormGroup;
    creds: JwtAuthentication;

    constructor(
        private formBuilder: FormBuilder,
        private modalService: NgbModal,
        private authenticationService: AuthenticationService,
        private router: Router
    ) { }

    ngOnInit() {
        this.creds = montarNovoAuthentication()
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
                this.autenticar();
            }
        }
    }

    autenticar() {
        this.loading = true;
        let aux: Response;

        this.authenticationService.authenticate(this.creds).subscribe(ret => {
            if (ret.body) {
                aux = JSON.parse(ret.body);
                this.authenticationService.loginComSucesso(aux);
            }

        }, error => {
            this.authenticationService.loginSemSucesso();
            alert(`${error}`)

        }, () => {
            if (aux.pessoa.pesPermissao == 'ROLE_TABLET') {
                this.router.navigate(['/tablet']);
            } else {
                this.router.navigate(['/home']);
            }
        });
    }

    deslogar() {
        this.authenticationService.deslogar();
    }

    open() {
        const modalRef = this.modalService.open(LoginModalComponent);
        modalRef.componentInstance.email = this.loginForm.value.pesEmail;
    }

}