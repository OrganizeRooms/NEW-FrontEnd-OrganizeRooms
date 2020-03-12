import { Injectable } from '@angular/core';
import { API_CONFIG } from '../_config';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ServiceHelper } from '../_helpers';
import { Pessoa, Response, ServiceWS } from '../_models';

@Injectable({ providedIn: 'root' })
export class PessoaService extends ServiceHelper implements ServiceWS<Pessoa> {
    
    buscarTodos(): Observable<Response> {
        return this.http
            .get<Response>(
                `${API_CONFIG.baseUrl}/pessoas`,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    adicionar(objeto: Pessoa): Observable<Response> {
        return this.http
            .post<Response>(
                `${API_CONFIG.baseUrl}/pessoas`,
                objeto,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    adicionarLista(pessoas: Array<Pessoa>): Observable<Response> {
        return this.http
            .post<Response>(
                `${API_CONFIG.baseUrl}/pessoas/importar`,
                pessoas,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    atualizar(objeto: Pessoa): Observable<Response> {
        return this.adicionar(objeto)
    }

    deletar(id: number): Observable<Response> {
        return this.http
            .delete<Response>(
                `${API_CONFIG.baseUrl}/pessoas/${id}`,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    resetarSenha(pessoa: Pessoa): Observable<Response> {
        return this.http
            .post<Response>(
                `${API_CONFIG.baseUrl}/pessoas/resetarSenha`,
                pessoa,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }
}