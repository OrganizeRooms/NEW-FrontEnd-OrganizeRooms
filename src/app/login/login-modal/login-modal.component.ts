import { Component, OnInit, Input, Directive } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { montarNovoAuthentication, AuthenticationService, JwtAuthentication } from 'src/app/shared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  loading = false;
  modalNovaSenhaForm: FormGroup;
  novaSenha = montarNovoAuthentication();
  @Input() email: string;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.criarFormulario();
  }

  criarFormulario() {
    this.modalNovaSenhaForm = this.formBuilder.group({
      senhaAtual: [null],
      novaPesSenha: [null],
      novaPesSenhaRepetir: [null]
    });
  }

  validarNovaSenha() {
    this.loading = true;

    if (this.modalNovaSenhaForm.value.senhaAtual != 'senha') {
      alert("Senha Atual Incorreta!")

    } else if (!this.validarCampos()) {
      alert("As senhas estão diferentes ou vazias!")

    } else {
      let email = montarNovoAuthentication(this.email);
      this.validarEmail(email);

    }
  }

  validarCampos(): boolean {
    return !(this.modalNovaSenhaForm.value.novaPesSenha != this.modalNovaSenhaForm.value.novaPesSenhaRepetir
      || this.modalNovaSenhaForm.value.novaPesSenha == null || this.modalNovaSenhaForm.value.novaPesSenha == ''
      || this.modalNovaSenhaForm.value.novaPesSenhaRepetir == null || this.modalNovaSenhaForm.value.novaPesSenhaRepetir == '')
  }

  validarEmail(email: JwtAuthentication) {

    let retorno: boolean;
    this.authenticationService.verificarEmail(email).subscribe(ret => {
      retorno = ret.data;

    }, err => { },
      () => {
        if (retorno) {
          this.novaSenha.pesEmail = this.email;
          this.novaSenha.pesSenha = this.modalNovaSenhaForm.value.senhaAtual;
          this.novaSenha.pesNovaSenha = this.modalNovaSenhaForm.value.novaPesSenha;

          this.alterarSenha();

        } else {
          alert("Email Inválido - Informe um E-mail Válido!");
        }
      }
    );
  }

  alterarSenha() {

    let retorno: boolean;
    this.authenticationService.novaSenha(this.novaSenha).subscribe(ret => {
      retorno = ret.data;

    }, err => { },
      () => {

        if (retorno) {
          alert("Senha alterada com sucesso! \nRealize o Login novamente com sua Nova senha");
          this.fecharModal();

        } else {
          alert("Não foi possível alterar a Senha! Tente Novamente.");
        }
      }
    );
  }

  fecharModal() {
    this.activeModal.close();
  }
}
