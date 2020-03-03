import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationController } from 'src/app/shared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})

export class LoginModalComponent implements OnInit {

  loading = false;
  modalNovaSenhaForm: FormGroup;
  novaSenha = this.authenticationController.montarNovoAuthentication();
  @Input() email: string;

  constructor(
    protected activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private authenticationController: AuthenticationController,
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
      let retornoEmail = this.validarEmail();

      if (retornoEmail) {
        this.novaSenha.pesEmail = this.email;
        this.novaSenha.pesSenha = this.modalNovaSenhaForm.value.senhaAtual;
        this.novaSenha.pesNovaSenha = this.modalNovaSenhaForm.value.novaPesSenha;

        let retornoSenha = this.alterarSenha();
        if (retornoSenha) {
          alert("Senha alterada com sucesso! \n Realize o Login novamente com sua Nova senha");
          this.fecharModal();

        } else {
          alert("Não foi possível alterar a Senha! Tente Novamente.");
        }

      } else {
        alert("Email inexistente! Informe um E-mail Válido!");
      }
    }
  }

  validarCampos(): boolean {
    return !(this.modalNovaSenhaForm.value.novaPesSenha != this.modalNovaSenhaForm.value.novaPesSenhaRepetir
      || this.modalNovaSenhaForm.value.novaPesSenha == null || this.modalNovaSenhaForm.value.novaPesSenha == ''
      || this.modalNovaSenhaForm.value.novaPesSenhaRepetir == null || this.modalNovaSenhaForm.value.novaPesSenhaRepetir == '')
  }

  async validarEmail(): Promise<boolean> {
    let email = this.authenticationController.montarNovoAuthentication();
    email.pesEmail = this.email

    return await this.authenticationController.verificarEmail(email);
  }

  async alterarSenha(): Promise<boolean> {
    return await this.authenticationController.alterarSenha(this.novaSenha);
  }

  fecharModal() {
    this.activeModal.close();
  }
}
