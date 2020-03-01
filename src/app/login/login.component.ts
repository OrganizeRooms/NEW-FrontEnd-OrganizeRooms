import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../router.animations';

import { AuthenticationService } from '../shared/_services';
import { JwtAuthentication } from '../shared';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    modalNovaSenhaForm: FormGroup;

    loading = false;

    //@Input() pessoaLogada: boolean;

    creds: JwtAuthentication = {
        pesEmail: '',
        pesSenha: '',
        pesNovaSenha: ''
    };

    novaSenha: JwtAuthentication = {
        pesEmail: '',
        pesSenha: '',
        pesNovaSenha: ''
    };

    constructor(private router: Router,
        private formBuilder: FormBuilder,
        private AuthenticationService: AuthenticationService,
        private modalService: NgbModal
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            pesEmail: [null],
            pesSenha: [null]
        });

        this.modalNovaSenhaForm = this.formBuilder.group({
            senhaAtual: [null],
            novaPesSenha: [null],
            novaPesSenhaRepetir: [null]
        });

    }

    verificarCredenciais(modalNovaSenha) {
        if (this.loginForm.value.pesEmail == null || this.loginForm.value.pesEmail == ''
            || this.loginForm.value.pesSenha == null || this.loginForm.value.pesSenha == '') {
            alert("Informe Credencias de Acesso Válidas!")

        } else {
            if (this.loginForm.value.pesSenha.toUpperCase() == 'senha'.toUpperCase()) {
                this.openModalNovaSenha(modalNovaSenha);
            } else {
                this.creds.pesEmail = this.loginForm.value.pesEmail;
                this.creds.pesSenha = this.loginForm.value.pesSenha;
                this.onSubmit();
            }
        }
    }

    verificarNovaSenha() {
        if (this.modalNovaSenhaForm.value.novaPesSenha != this.modalNovaSenhaForm.value.novaPesSenhaRepetir
            || this.modalNovaSenhaForm.value.novaPesSenha == null || this.modalNovaSenhaForm.value.novaPesSenha == ''
            || this.modalNovaSenhaForm.value.novaPesSenhaRepetir == null || this.modalNovaSenhaForm.value.novaPesSenhaRepetir == '') {

            alert("As senhas estão diferentes ou vazias!")
        } else if (this.modalNovaSenhaForm.value.senhaAtual != 'senha') {
            alert("Senha Atual Incorreta!")
        } else {
            // Verificar se email existe
            this.novaSenha.pesEmail = this.loginForm.value.pesEmail
            this.AuthenticationService.verificarEmail(this.novaSenha).subscribe(response => {

                const existeEmail = response.data;
                if (existeEmail) {
                    // Verificar se email existe
                    this.novaSenha.pesEmail = this.loginForm.value.pesEmail
                    this.novaSenha.pesSenha = this.modalNovaSenhaForm.value.senhaAtual
                    this.novaSenha.pesNovaSenha = this.modalNovaSenhaForm.value.novaPesSenha

                    this.AuthenticationService.novaSenha(this.novaSenha).subscribe(ret =>{
                        if(ret.data != false){
                            alert("Senha alterada com sucesso! \n Realize o Login novamente com sua Nova senha");
                            this.loginForm = this.formBuilder.group({
                                pesEmail: [this.novaSenha.pesEmail],
                                pesSenha: [null]
                            });
                            this.modalService.dismissAll()
                        }else{
                            alert("Não foi possível alterar a Senha!");
                        }
                    })
                } else {
                    alert("Email inexistente! Informe um E-mail Válido!");
                }
            });
        }
    }

    onSubmit() {
        this.loading = true;
        this.AuthenticationService.authenticate(this.creds).subscribe(response => {
            const aux = JSON.parse(response.body);
            this.AuthenticationService.successfulLogin(aux);
        }, error => {
            this.AuthenticationService.noSuccessfulLogin();
            this.showError();
        });
    }

    showError() {
        alert('Credenciais Incorretas! Informe Novamente.');
    }

    deslogar() {
        this.AuthenticationService.noSuccessfulLogin();
        this.router.navigate(['/login']);
    }

    openModalNovaSenha(modalNovaSenha) {
        this.modalService.open(modalNovaSenha)
    }
}