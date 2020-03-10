import { Observable, throwError } from 'rxjs';
import { Response } from './response';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SessionStorageService } from '../_services';

export abstract class ServiceWS<T> {

    constructor(
        protected http: HttpClient,
        private sessionStorageService: SessionStorageService
    ) { };

    abstract buscarTodos(): Observable<Response>;
    abstract adicionar(objeto: T): Observable<Response>;
    abstract atualizar(objeto: T): Observable<Response>;
    abstract deletar(id: string): Observable<Response>;

    protected httpOptionsForBackEnd(): HttpHeaders {

        const localUser = this.sessionStorageService.getValue();

        let token = localUser.token ? localUser.token : '';
        return new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
    }

    protected handleError(error: HttpErrorResponse) {

        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Erro ocorreu no lado do client
            errorMessage = error.error.message;

        } else {
            // Erro ocorreu no lado do servidor
            errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
        }

        console.log(errorMessage);
        return throwError(errorMessage);
    };

}