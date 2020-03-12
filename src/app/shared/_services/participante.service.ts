import { Injectable } from '@angular/core';
import { API_CONFIG } from '../_config';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ServiceHelper } from '../_helpers';
import { Response, Participante, ServiceWS } from '../_models';

@Injectable({ providedIn: 'root' })
export class ParticipanteService extends ServiceHelper implements ServiceWS<Participante>{

    buscarTodos(): Observable<Response> {
        throw new Error("Este metodo não é utilizado!.");
    }

    adicionar(objeto: Participante): Observable<Response> {
        return this.http
            .post<Response>(
                `${API_CONFIG.baseUrl}/participantes`,
                objeto,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    adicionarLista(participantes: Array<Participante>): Observable<Response> {
        return this.http
            .post<Response>(
                `${API_CONFIG.baseUrl}/participantes/listaParticipantes`,
                participantes,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    atualizar(objeto: Participante): Observable<Response> {
        return this.http
            .post<Response>(
                `${API_CONFIG.baseUrl}/participantes/alterar`,
                objeto,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    deletar(id: number): Observable<Response> {
        return this.http
            .delete<Response>(
                `${API_CONFIG.baseUrl}/participantes/deletar/${id}`,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    buscarPorAgendamento(ageId: String): Observable<Response> {
        return this.http
            .get<Response>(
                `${API_CONFIG.baseUrl}/participantes/porAgendamento/` + ageId,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }
}