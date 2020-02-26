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
    public pushRightClass: string;
    currentPessoa;

    listNotificacoes;
    contNotificacoes;

    constructor(public router: Router,
        private sessionService: SessionStorageService,
        private authenticationService: AuthenticationService,
        private pessoaService: PessoaService,
        private notificacaoService: NotificacaoService) {

        this.currentPessoa = this.sessionService.getSessionUser().pessoa;

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
        this.notificacaoService.buscarPorPessoa(this.currentPessoa.pesId).subscribe(ret => {
            if (ret.data != null && ret.data != '') {
                this.listNotificacoes = ret.data;
            } else {
                this.listNotificacoes = null
            }
        });
    }

    contador() {
        this.notificacaoService.buscarPorPessoa(this.currentPessoa.pesId).subscribe(ret => {
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
            notPesAtualizacao: this.sessionService.getSessionUser().pessoa.pesId,
            notDtAtualizacao: new Date(),
            notDescricao: null,         // não é alterado
            notPessoa: null,            // não é alterado
            notPesCadastro: null,       // não é alterado
            notDtCadastro: null,        // não é alterado
            notEnviado: null,           // não é alterado
            enviaEmail: null,
        }

        this.notificacaoService.atualizarNotificacao(notificacao).subscribe(ret => {
            //
        });

        location.reload() // recarrega o component para atualizar o contador
    }

    resetarSenha() {
        this.pessoaService.resetarSenha(this.currentPessoa).subscribe(ret => {
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
        this.authenticationService.noSuccessfulLogin();//DESLOGAR
        this.router.navigate(['/login']);
    }
}
