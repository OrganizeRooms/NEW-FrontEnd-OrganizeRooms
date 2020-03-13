import { Injectable } from '@angular/core';
import { API_CONFIG } from '../_config';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ServiceHelper } from '../_helpers';
import { Response, ServiceWS, Mensagem } from '../_models';

@Injectable({ providedIn: 'root' })
export class MensagemService extends ServiceHelper implements ServiceWS<Mensagem>{

    buscarTodos(): Observable<Response> {
        return this.http
            .get<Response>(
                `${API_CONFIG.baseUrl}/mensagem`,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    adicionar(objeto: Mensagem): Observable<Response> {
        return this.http
            .post<Response>(
                `${API_CONFIG.baseUrl}/mensagem`,
                objeto,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    atualizar(objeto: Mensagem): Observable<Response> {
        return this.adicionar(objeto);
    }

    deletar(id: number): Observable<Response> {
        throw new Error("Este metodo não é utilizado!.");
    }

    buscarPorTipo(tipo: number): Observable<Response> {
        return this.http
            .get<Response>(
                `${API_CONFIG.baseUrl}/unidades/porId/${tipo}`,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }
}