import { SessionStorageService } from '../_services/sessionStorage.service';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ServiceHelper {

    constructor(
        private sessionStorageService: SessionStorageService,
        protected http: HttpClient
    ) { }

    protected httpOptions(): HttpHeaders {

        const localUser = this.sessionStorageService.getValue();

        let token = localUser.token ? localUser.token : '';

        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/text')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`);

        return headers;
    }

    protected handleError(error?: HttpErrorResponse) {

        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Erro ocorreu no lado do client
            errorMessage = error.error.message;

        } else {
            // Erro ocorreu no lado do servidor
            errorMessage = `Código do erro: ${error.status}, mensagem: ${error.message}`;
        }

        console.log(errorMessage);
        return throwError(errorMessage);
    };

}
