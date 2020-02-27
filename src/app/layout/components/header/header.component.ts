import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthenticationService, PessoaService, SessionStorageService, NotificacaoService } from '../../../shared/_services';
import { Notificacao } from 'src/app/shared';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    pushRightClass: string;
    localUser = SessionStorageService.getSessionUser();

    listNotificacoes;
    contNotificacoes;

    constructor(
        private router: Router,
        private AuthenticationService: AuthenticationService,
        private PessoaService: PessoaService,
        private NotificacaoService: NotificacaoService
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
        //this.carregarNotificacoes()
        this.contador();
    }

    carregarNotificacoes() {
        this.NotificacaoService.buscarPorPessoa(this.localUser.pessoa.pesId.toString()).subscribe(ret => {
            if (ret.data != null && ret.data != '') {
                this.listNotificacoes = ret.data;
            } else {
                this.listNotificacoes = null
            }
        });
    }

    contador() {
        this.NotificacaoService.buscarPorPessoa(this.localUser.pessoa.pesId.toString()).subscribe(ret => {
            if (ret.data != null && ret.data != '') {
                var list: any[] = ret.data;

                this.contNotificacoes = list.length
            } else {
                this.contNotificacoes = 0
            }
        });
    }

    desativarNotificacao(registro) {

        var notificacao: Notificacao = {
            notId: registro.notId,
            notAtiva: false,
            notPesAtualizacao: SessionStorageService.getSessionUser().pessoa.pesId,
            notDtAtualizacao: new Date(),
            notDescricao: null,         // não é alterado
            notPessoa: null,            // não é alterado
            notPesCadastro: null,       // não é alterado
            notDtCadastro: null,        // não é alterado
            notEnviado: null,           // não é alterado
            enviaEmail: null,
        }

        this.NotificacaoService.atualizarNotificacao(notificacao).subscribe(ret => {
            //
        });

        location.reload() // recarrega o component para atualizar o contador
    }

    resetarSenha() {
        this.PessoaService.resetarSenha(this.localUser.pessoa).subscribe(ret => {
            if (ret.data != 'false') {
                alert("Senha Resetada com Sucesso!")
            } else {
                alert("Erro ao Resetar Senha!")
            }
        });
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    logout() {
        this.AuthenticationService.noSuccessfulLogin();//DESLOGAR
        this.router.navigate(['/login']);
    }
}
