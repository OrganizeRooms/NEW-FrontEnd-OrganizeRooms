import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';
import { SessionStorageService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    
    constructor(
        private router: Router,
        private sessionStorageService: SessionStorageService
    ) { }

    canActivate() {
       // if (localStorage.getItem('localUser')) {
       //     return true;
       // }
        if (this.sessionStorageService.getValue()) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}