import { Injectable } from '@angular/core';
import { API_CONFIG } from '../_config';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ServiceHelper } from '../_helpers';
import { Equipamento, Response, AgendamentoContext, ServiceWS } from '../_models';


@Injectable({ providedIn: 'root' })
export class EquipamentoService extends ServiceHelper implements ServiceWS<Equipamento>{

    buscarTodos(): Observable<Response> {
        return this.http
            .get<Response>(
                `${API_CONFIG.baseUrl}/equipamentos`,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    adicionar(objeto: Equipamento): Observable<Response> {
        return this.http
            .post<Response>(
                `${API_CONFIG.baseUrl}/equipamentos`,
                objeto,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    atualizar(objeto: Equipamento): Observable<Response> {
        return this.adicionar(objeto);
    }

    deletar(id: number): Observable<Response> {
        return this.http
            .delete<Response>(
                `${API_CONFIG.baseUrl}/equipamentos/${id}`,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    // Equipamentos Disponiveis
    buscarDisponiveis(agendamentoContext: AgendamentoContext): Observable<Response> {
        return this.http
            .post<Response>(
                `${API_CONFIG.baseUrl}/equipamentos/equidisp`,
                agendamentoContext,
                { headers: this.httpOptions() }
            ).pipe(
                retry(2),
                catchError(this.handleError)
            );
    }
}