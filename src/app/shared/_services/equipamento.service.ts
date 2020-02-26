import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_CONFIG } from '../../shared/_config';
import { Equipamento, Response, Unidade, AgendamentoContext } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EquipamentoService {
    constructor(private http: HttpClient) { }

    buscarTodosEquipamentos(): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/equipamentos`);
    }

    // Equipamentos Disponiveis
    buscarEquipamentosDisponiveis(agendamentoContext: AgendamentoContext): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/equipamentos/equidisp`, agendamentoContext);
    }

    adicionarAtualizarEquipamento(equipamento: Equipamento): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/equipamentos`, equipamento);
    }

    deletarEquipamento(id: String): Observable<Response> {
        return this.http.delete<Response>(`${API_CONFIG.baseUrl}/equipamentos/` + id);
    }
}