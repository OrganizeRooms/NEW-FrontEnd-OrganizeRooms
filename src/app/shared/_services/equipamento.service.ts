import { Injectable } from '@angular/core';

import { API_CONFIG } from '../../shared/_config';
import { Equipamento, Response, AgendamentoContext, ServiceWS } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EquipamentoService extends ServiceWS<Equipamento>{

    buscarTodos(): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/equipamentos`);
    }

    adicionar(objeto: Equipamento): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/equipamentos`, objeto);
    }

    atualizar(objeto: Equipamento): Observable<Response> {
        return this.adicionar(objeto);
    }

    deletar(id: String): Observable<Response> {
        return this.http.delete<Response>(`${API_CONFIG.baseUrl}/equipamentos/` + id);
    }

    // Equipamentos Disponiveis
    buscarDisponiveis(agendamentoContext: AgendamentoContext): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/equipamentos/equidisp`, agendamentoContext);
    }
}