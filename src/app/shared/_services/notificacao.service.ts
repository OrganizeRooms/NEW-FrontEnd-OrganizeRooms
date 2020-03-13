import { Injectable } from '@angular/core';
import { API_CONFIG } from '../_config';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ServiceHelper } from '../_helpers';
import { Notificacao, Response, ServiceWS } from '../_models';

@Injectable({ providedIn: 'root' })
export class NotificacaoService extends ServiceHelper implements ServiceWS<Notificacao> {

    buscarTodos(): Observable<Response> {
        throw new Error("Este metodo não é utilizado!.");
    }

    adicionar(objeto: Notificacao): Observable<Response> {
        throw new Error("Este metodo não é utilizado!.");
    }

    atualizar(objeto: Notificacao): Observable<Response> {
        return this.http
            .post<Response>(
                `${API_CONFIG.baseUrl}/notificacao`,
                objeto,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    deletar(id: number): Observable<Response> {
        throw new Error("Este metodo não é utilizado!.");
    }

    // Traz somente as ativas
    buscarPorIdPessoa(idPessoa: number): Observable<Response> {
        return this.http
            .get<Response>(
                `${API_CONFIG.baseUrl}/notificacao/pessoa/${idPessoa}`,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    enviarEmail(notificacao: Array<Notificacao>): Observable<Response> {
        return this.http
            .post<Response>(
                `${API_CONFIG.baseUrl}/notificacao/enviaEmail`,
                notificacao,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }
}