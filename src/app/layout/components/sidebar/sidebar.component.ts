import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { SessionStorageService } from 'src/app/shared/_services';
import { LocalUser } from 'src/app/shared/_models';
import { PessoaController, AuthenticationController } from 'src/app/shared/_controllers';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;
    localUser: LocalUser;
    permissao: string;

    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(
        private router: Router,
        private authenticationController: AuthenticationController,
        private sessionStorageService: SessionStorageService,
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
        this.isActive = false;
        this.collapsed = false;
        this.showMenu = '';
        this.pushRightClass = 'push-right';

        this.localUser = this.sessionStorageService.getValue();
        this.permissao = this.localUser.pessoa.pesPermissao
    }

    resetarSenha() {

        let retorno = this.pessoaController.resetarSenha(this.localUser.pessoa);

        if (retorno) {
            alert("Senha Resetada com Sucesso!")
        } else {
            alert("Erro ao Resetar Senha!")
        }
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    togglecollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
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

    deslogar() {
        this.authenticationController.deslogar();
    }
}
