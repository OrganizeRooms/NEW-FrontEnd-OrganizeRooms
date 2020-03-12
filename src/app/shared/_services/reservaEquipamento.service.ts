import { Injectable } from '@angular/core';
import { API_CONFIG } from '../_config';
import { Observable } from 'rxjs';
import { ServiceHelper } from '../_helpers';
import { Response, ServiceWS, ReservaEquipamento} from '../_models';

@Injectable({ providedIn: 'root' })
export class ReservaEquipamentoService extends ServiceHelper implements ServiceWS<ReservaEquipamento> {

    buscarTodos(): Observable<Response> {
        throw new Error("Este metodo não é utilizado!.");
    }

    adicionar(objeto: ReservaEquipamento): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/reservaEquipamento`, objeto);
    }

    adicionarLista(reservas: Array<ReservaEquipamento>): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/reservaEquipamento/listaReservas`, reservas);
    }

    atualizar(objeto: ReservaEquipamento): Observable<Response> {
        return this.adicionar(objeto);
    }

    deletar(id: number): Observable<Response> {
        return this.http.delete<Response>(`${API_CONFIG.baseUrl}/reservaEquipamento/deletar/${id}`);
    }

    buscarPorAgendamento(ageId: String): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/reservaEquipamento/porAgendamento/${ageId}`);
    }
}