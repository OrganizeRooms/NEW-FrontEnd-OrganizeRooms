import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_CONFIG } from '../../shared/_config';
import { Response, Unidade, Participante } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ParticipanteService {
    constructor(private http: HttpClient) { }

    buscarPorAgendamento(ageId: String): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/participantes/porAgendamento/` + ageId);
    }

    adicionarParticipante(participante: Participante): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/participantes`, participante);
    }

    adicionarListaParticipantes(participantes: Array<Participante>): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/participantes/listaParticipantes`, participantes);
    }

    alterarParticipante(participante: Participante): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/participantes/alterar`, participante);
    }

    deletarParticipante(partId: String): Observable<Response> {
        return this.http.delete<Response>(`${API_CONFIG.baseUrl}/participantes/deletar/` + partId);
    }

}