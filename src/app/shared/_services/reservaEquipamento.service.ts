import { Injectable } from '@angular/core';
import { API_CONFIG } from '../_config';
import { Response, Participante, ServiceWS } from '../_models';
import { Observable } from 'rxjs';
import { ReservaEquipamento } from '../_models/interfaces/reservaEquipamento';

@Injectable({ providedIn: 'root' })
export class ReservaEquipamentoService extends ServiceWS<ReservaEquipamento> {

    buscarTodos(): Observable<Response> {
        throw new Error("Este metodo não é utilizado!.");
    }

    adicionar(objeto: ReservaEquipamento): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/reservaEquipamento`, objeto);
    }

    adicionarLista(reservas: Array<Participante>): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/reservaEquipamento/listaReservas`, reservas);
    }

    atualizar(objeto: ReservaEquipamento): Observable<Response> {
        return this.adicionar(objeto);
    }

    deletar(resId: String): Observable<Response> {
        return this.http.delete<Response>(`${API_CONFIG.baseUrl}/reservaEquipamento/deletar/` + resId);
    }

    buscarPorAgendamento(ageId: String): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/reservaEquipamento/porAgendamento/` + ageId);
    }
}