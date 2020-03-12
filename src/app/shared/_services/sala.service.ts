import { Injectable } from '@angular/core';
import { API_CONFIG } from '../_config';
import { Observable } from 'rxjs';
import { ServiceHelper } from '../_helpers';
import { Sala, Response, AgendamentoContext, ServiceWS } from '../_models';

@Injectable({ providedIn: 'root' })
export class SalaService extends ServiceHelper implements ServiceWS<Sala>{

    buscarTodos(): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/salas`);
    }

    adicionar(objeto: Sala): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/salas`, objeto);
    }

    atualizar(objeto: Sala): Observable<Response> {
        return this.adicionar(objeto);
    }

    deletar(id: number): Observable<Response> {
        return this.http.delete<Response>(`${API_CONFIG.baseUrl}/salas/${id}`);
    }

    // Salas Disponiveis
    buscarDisponiveis(agendamentoContext: AgendamentoContext): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/salas/salasdisp`, agendamentoContext);
    }

    buscarPorId(id: number): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/salas/${id}`);
    }
}