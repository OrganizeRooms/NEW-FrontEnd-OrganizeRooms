import { Injectable } from '@angular/core';

import { API_CONFIG } from '../../shared/_config';
import { Pessoa, Response, ServiceWS } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PessoaService extends ServiceWS<Pessoa> {

    buscarTodos(): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/pessoas`);
    }

    adicionar(objeto: Pessoa): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/pessoas`, objeto);
    }

    adicionarLista(pessoas: Array<Pessoa>): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/pessoas/importar`, pessoas);
    }

    atualizar(objeto: Pessoa): Observable<Response> {
        return this.adicionar(objeto)
    }

    deletar(id: String): Observable<Response> {
        return this.http.delete<Response>(`${API_CONFIG.baseUrl}/pessoas/` + id);
    }

    resetarSenha(pessoa: Pessoa): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/pessoas/resetarSenha`, pessoa);
    }
}