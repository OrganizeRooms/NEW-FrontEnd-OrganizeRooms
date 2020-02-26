import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_CONFIG } from '../../shared/_config';
import { Notificacao, Response } from '../_models';
import { EnviaEmail } from '../_models/enviaEmail';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificacaoService {
    constructor(private http: HttpClient) { }

    // Traz somente as ativas
    buscarPorPessoa(idPessoa: String): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/notificacao/pessoa/` + idPessoa);
    }

    atualizarNotificacao(notificacao: Notificacao): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/notificacao`, notificacao);
    }
    
    enviarEmail(notificacao: Array<Notificacao>): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/notificacao/enviaEmail`, notificacao);
    }

    enviarEmailAvulso(notificacao: Notificacao): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/notificacao/enviaEmailAvulso`, notificacao);
    }
}