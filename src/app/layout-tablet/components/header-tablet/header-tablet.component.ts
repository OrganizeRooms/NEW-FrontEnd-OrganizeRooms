import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthenticationService, SessionStorageService } from '../../../shared/_services';

@Component({
    selector: 'app-header-tablet',
    templateUrl: './header-tablet.component.html',
    styleUrls: ['./header-tablet.component.scss']
})
export class HeaderTabletComponent implements OnInit {
    public pushRightClass: string;
    currentPessoa;

    constructor(private router: Router,
        
        private AuthenticationService: AuthenticationService) {

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
