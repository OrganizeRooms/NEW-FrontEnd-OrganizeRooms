import { Injectable } from '@angular/core';

import { API_CONFIG } from '../../shared/_config';
import { Response, Unidade, Participante, ServiceWS } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ParticipanteService extends ServiceWS<Participante>{

    buscarTodos(): Observable<Response> {
        throw new Error("Este metodo não é utilizado!.");
    }

    adicionar(objeto: Participante): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/participantes`, objeto);
    }

    adicionarLista(participantes: Array<Participante>): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/participantes/listaParticipantes`, participantes);
    }

    atualizar(objeto: Participante): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/participantes/alterar`, objeto);
    }

    deletar(Id: string): Observable<Response> {
        return this.http.delete<Response>(`${API_CONFIG.baseUrl}/participantes/deletar/` + Id);
    }

    buscarPorAgendamento(ageId: String): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/participantes/porAgendamento/` + ageId);
    }
}