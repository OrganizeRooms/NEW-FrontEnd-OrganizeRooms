import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_CONFIG } from '../../shared/_config';
import { Sala, Response, AgendamentoContext } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SalaService {
    constructor(private http: HttpClient) { }

    buscarTodasSalas(): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/salas`);
    }

    // Salas Disponiveis
    buscarSalasDisponiveis(agendamentoContext: AgendamentoContext): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/salas/salasdisp`, agendamentoContext);
    }

    buscarSalaPorId(id: String): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/salas` + id);
    }

    adicionarAtualizarSala(sala: Sala): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/salas`, sala);
    }

    deletarSala(id: String): Observable<Response> {
        return this.http.delete<Response>(`${API_CONFIG.baseUrl}/salas/` + id);
    }

}