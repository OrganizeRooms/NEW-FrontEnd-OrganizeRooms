import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_CONFIG } from '../../shared/_config';
import { Response, Unidade } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UnidadeService {
    constructor(private http: HttpClient) { }

    buscarTodasUnidades(): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/unidades`);
    }

    buscarUnidadesAtivas(): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/unidades/ativo`);
    }

    buscarUnidadePorId(id: String): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/unidades/` + id);
    }

    deletarUnidade(id: String): Observable<Response> {
        return this.http.delete<Response>(`${API_CONFIG.baseUrl}/unidades/` + id);
    }

    adicionarAtualizarUnidade(unidade: Unidade): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/unidades`, unidade);
    }

}