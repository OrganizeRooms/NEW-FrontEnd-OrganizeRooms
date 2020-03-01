import { Injectable } from '@angular/core';

import { API_CONFIG } from '../../shared/_config';
import { Response, Unidade, ServiceWS } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UnidadeService extends ServiceWS<Unidade>{

    buscarTodos(): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/unidades`);
    }

    adicionar(objeto: Unidade): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/unidades`, objeto);
    }

    atualizar(objeto: Unidade): Observable<Response> {
        return this.adicionar(objeto);
    }

    deletar(id: string): Observable<Response> {
        return this.http.delete<Response>(`${API_CONFIG.baseUrl}/unidades/` + id);
    }

    buscarAtivas(): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/unidades/ativo`);
    }

    buscarPorId(id: String): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/unidades/` + id);
    }

}