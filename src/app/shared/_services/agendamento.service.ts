import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../_config';
import { retry, catchError } from 'rxjs/operators';
import { ServiceHelper } from '../_helpers';
import { Agendamento, Response, AgendamentoContext, ServiceWS } from '../_models';

@Injectable({ providedIn: 'root' })
export class AgendamentoService extends ServiceHelper implements ServiceWS<Agendamento>{

    buscarTodos(): Observable<Response> {
        return this.http
            .get<Response>(
                `${API_CONFIG.baseUrl}/agendamentos`,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    adicionar(objeto: Agendamento): Observable<Response> {
        return this.http
            .post<Response>(
                `${API_CONFIG.baseUrl}/agendamentos`,
                objeto,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    atualizar(objeto: Agendamento): Observable<Response> {
        return this.http
            .post<Response>(
                `${API_CONFIG.baseUrl}/agendamentos/atualizar`,
                objeto,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    deletar(id: number): Observable<Response> {
        throw new Error("Este metodo não é utilizado!.");
    }

    buscarPorParticipanteEDia(agendamentoContext: AgendamentoContext): Observable<Response> {
        return this.http
            .post<Response>(
                `${API_CONFIG.baseUrl}/agendamentos/participante`,
                agendamentoContext,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    buscarPorSalaEData(agendamentoContext: AgendamentoContext): Observable<Response> {
        return this.http
            .post<Response>(
                `${API_CONFIG.baseUrl}/agendamentos/salas`,
                agendamentoContext,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    buscarTodosDaSala(idSala: String, data: String): Observable<Response> {
        return this.http
            .get<Response>(
                `${API_CONFIG.baseUrl}/agendamentos/sala` + idSala + data,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    buscarPorResponsavel(agendamentoContext: AgendamentoContext): Observable<Response> {
        return this.http
            .post<Response>(
                `${API_CONFIG.baseUrl}/agendamentos/responsavel`,
                agendamentoContext,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }
}