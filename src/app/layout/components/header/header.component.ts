import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { SessionStorageService, PessoaService, NotificacaoService, AuthenticationService } from '../../../shared/_services';
import { Notificacao, LocalUser } from 'src/app/shared/_models';

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
        private authenticationService: AuthenticationService,
        private notificacaoService: NotificacaoService,
        private pessoaService: PessoaService
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

    carregarNotificacoes() {
        this.notificacaoService.buscarPorIdPessoa(this.localUser.pessoa.pesId).subscribe(ret => {
            this.listNotificacoes = ret.data;
            this.contNotificacoes = this.listNotificacoes.length;
        });
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

        this.notificacaoService.atualizar(not).subscribe(ret => {
            location.reload();
        });
        //location.reload() // recarrega o component para atualizar o contador
    }

    resetarSenha() {

        let retorno: boolean;
        this.pessoaService.resetarSenha(this.localUser.pessoa).subscribe(ret => {
            retorno = ret.data;
        }, err => { },
            () => {
                if (retorno) {
                    alert("Senha Resetada com Sucesso!")
                    this.deslogar();
                    
                } else {
                    alert("Erro ao Resetar Senha!")
                }
            }
        );
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
        this.authenticationService.deslogar();
    }

}
