import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { SessionStorageService } from '../../../shared/_services';
import { Notificacao, LocalUser } from 'src/app/shared/_models';
import { NotificacaoController, PessoaController, AuthenticationController } from 'src/app/shared/_controllers';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    pushRightClass: string;
    localUser: LocalUser;

    listNotificacoes: Notificacao[];
    contNotificacoes: number;

    constructor(
        private router: Router,
        private sessionStorageService: SessionStorageService,
        private authenticationController: AuthenticationController,
        private notificacaoController: NotificacaoController,
        private pessoaController: PessoaController
    ) {

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.localUser = this.sessionStorageService.getValue();
        this.carregarNotificacoes()
    }

    async carregarNotificacoes() {
        this.listNotificacoes = await this.notificacaoController.buscarTodosPorIdPessoa(this.localUser.pessoa.pesId);
        this.contNotificacoes = this.listNotificacoes.length;
    }

    desativarNotificacao(registro: Notificacao) {

        let not: Notificacao = {
            notId: registro.notId,
            notAtiva: false,
            notPesAtualizacao: this.sessionStorageService.getValue().pessoa.pesId,
            notDtAtualizacao: new Date(),
            notDescricao: '',                            // não é alterado
            notPessoa: null,                             // não é alterado
            notPesCadastro: registro.notPesCadastro,     // não é alterado
            notDtCadastro: registro.notDtCadastro,        // não é alterado
            notEnviado: registro.notEnviado,              // não é alterado
            enviaEmail: null,
        };

        this.notificacaoController.atualizar(not);
        //location.reload() // recarrega o component para atualizar o contador
    }

    resetarSenha() {

        let retorno = this.pessoaController.resetarSenha(this.localUser.pessoa);

        if (retorno) {
            alert("Senha Resetada com Sucesso!")
        } else {
            alert("Erro ao Resetar Senha!")
        }
    }

    isToggled(): boolean {
        const dom = document.querySelector('body');
        return dom != null ? dom.classList.contains(this.pushRightClass) : false;
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    deslogar() {
        this.authenticationController.deslogar();
    }

}
