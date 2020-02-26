import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_CONFIG } from '../_config';
import { Response, Participante } from '../_models';
import { Observable } from 'rxjs';
import { ReservaEquipamento } from '../_models/reservaEquipamento';

@Injectable({ providedIn: 'root' })
export class ReservaEquipamentoService {
    constructor(private http: HttpClient) { }

    adicionarReserva(reserva: ReservaEquipamento): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/reservaEquipamento`, reserva);
    }

    deletarReserva(resId: String): Observable<Response> {
        return this.http.delete<Response>(`${API_CONFIG.baseUrl}/reservaEquipamento/deletar/` + resId);
    }

    buscarPorAgendamento(ageId: String): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/reservaEquipamento/porAgendamento/` + ageId);
    }

    adicionarListaReservas(reservas: Array<Participante>): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/reservaEquipamento/listaReservas`, reservas);
    }

}