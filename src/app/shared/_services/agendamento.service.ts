import { Injectable } from '@angular/core';

import { API_CONFIG } from '../../shared/_config';
import { Agendamento, Response, AgendamentoContext, ServiceWS } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AgendamentoService extends ServiceWS<Agendamento>{


    buscarTodos(): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/agendamentos`);
    }

    adicionar(objeto: Agendamento): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/agendamentos`, objeto);
    }

    atualizar(objeto: Agendamento): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/agendamentos/atualizar`, objeto);
    }

    deletar(id: string): Observable<Response> {
        throw new Error("Este metodo não é utilizado!.");
    }

    buscarPorParticipanteEDia(agendamentoContext: AgendamentoContext): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/agendamentos/participante`, agendamentoContext);
    }

    buscarPorSalaEData(agendamentoContext: AgendamentoContext): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/agendamentos/salas`, agendamentoContext);
    }

    buscarTodosDaSala(idSala: String, data: String): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/agendamentos/sala` + idSala + data);
    }

    buscarPorResponsavel(agendamentoContext: AgendamentoContext): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/agendamentos/responsavel`, agendamentoContext);
    }
}