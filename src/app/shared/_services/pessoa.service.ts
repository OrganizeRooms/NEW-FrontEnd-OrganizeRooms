import { Injectable } from '@angular/core';

import { API_CONFIG } from '../../shared/_config';
import { Pessoa, Response, Service } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PessoaService extends Service<Pessoa> {

    buscarTodos(): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/pessoas`);
    }

    adicionar(objeto: Pessoa): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/pessoas`, objeto);
    }

    atualizar(objeto: Pessoa): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/pessoas`, objeto);
    }

    deletar(id: String): Observable<Response> {
        return this.http.delete<Response>(`${API_CONFIG.baseUrl}/pessoas/` + id);
    }

    buscarTodasPessoas(): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/pessoas`);
    }

    adicionarAtualizarPessoa(pessoa: Pessoa): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/pessoas`, pessoa);
    }

    importarPessoas(pessoas: Array<Pessoa>): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/pessoas/importar`, pessoas);
    }

    resetarSenha(pessoa: Pessoa): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/pessoas/resetarSenha`, pessoa);
    }

}