import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_CONFIG } from '../../shared/_config';
import { Agendamento, Unidade, Response, AgendamentoContext } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AgendamentoService {
    constructor(private http: HttpClient) { }


    buscarTodosAgendamentos(): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/agendamentos`);
    }

    buscarAgendamentoDoUsuarioPorDia(agendamentoContext: AgendamentoContext): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/agendamentos/participante`, agendamentoContext);
    }

    buscarAgendamentoPorSalaEData(agendamentoContext: AgendamentoContext): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/agendamentos/salas`, agendamentoContext);
    }

    buscarTodosDaSala(idSala: String, data: String): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/agendamentos/sala` + idSala + data);
    }

    buscarPorResponsavel(agendamentoContext: AgendamentoContext): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/agendamentos/responsavel`, agendamentoContext);
    }

    addAgendamento(agendamento: Agendamento): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/agendamentos`, agendamento);
    }

    atualizarAgendamento(agendamento: Agendamento): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/agendamentos/atualizar`, agendamento);
    }
}