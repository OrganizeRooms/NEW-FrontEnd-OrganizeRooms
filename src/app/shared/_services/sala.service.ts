import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_CONFIG } from '../../shared/_config';
import { Sala, Response, AgendamentoContext, ServiceWS } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SalaService extends ServiceWS<Sala>{
    
    buscarTodos(): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/salas`);
    }

    adicionar(objeto: Sala): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/salas`, objeto);
    }

    atualizar(objeto: Sala): Observable<Response> {
        return this.adicionar(objeto);
    }

    deletar(id: string): Observable<Response> {
        return this.http.delete<Response>(`${API_CONFIG.baseUrl}/salas/` + id);
    }

    // Salas Disponiveis
    buscarDisponiveis(agendamentoContext: AgendamentoContext): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/salas/salasdisp`, agendamentoContext);
    }

    buscarPorId(id: String): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/salas` + id);
    }
}