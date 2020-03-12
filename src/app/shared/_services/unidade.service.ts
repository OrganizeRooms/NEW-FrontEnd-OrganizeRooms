import { Injectable } from '@angular/core';

import { API_CONFIG } from '../_config';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ServiceHelper } from '../_helpers';
import { Response, Unidade } from '../_models';
import { ServiceWS } from '../_models/service-ws';

@Injectable({ providedIn: 'root' })
export class UnidadeService extends ServiceHelper implements ServiceWS<Unidade>{

    buscarTodos(): Observable<Response> {
        return this.http
            .get<Response>(
                `${API_CONFIG.baseUrl}/unidades`,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    adicionar(objeto: Unidade): Observable<Response> {
        return this.http
            .post<Response>(
                `${API_CONFIG.baseUrl}/unidades`,
                objeto,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    atualizar(objeto: Unidade): Observable<Response> {
        return this.adicionar(objeto);
    }

    deletar(id: number): Observable<Response> {
        return this.http
            .delete<Response>(
                `${API_CONFIG.baseUrl}/unidades/${id}`,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    buscarAtivas(): Observable<Response> {
        return this.http
            .get<Response>(
                `${API_CONFIG.baseUrl}/unidades/ativo`,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    buscarPorId(id: String): Observable<Response> {
        return this.http
            .post<Response>(
                `${API_CONFIG.baseUrl}/unidades/porId/`,
                id,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }
    /*
    buscarPorId(id: String): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/unidades/` + id);
    }*/

}