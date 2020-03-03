import { Injectable } from '@angular/core';

import { API_CONFIG } from '../../shared/_config';
import { Notificacao, Response, ServiceWS } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificacaoService extends ServiceWS<Notificacao> {

    buscarTodos(): Observable<Response> {
        throw new Error("Este metodo não é utilizado!.");
    }

    adicionar(objeto: Notificacao): Observable<Response> {
        return this.enviarEmailAvulso(objeto);
    }

    atualizar(objeto: Notificacao): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/notificacao`, objeto);
    }

    deletar(id: string): Observable<Response> {
        throw new Error("Este metodo não é utilizado!.");
    }

    // Traz somente as ativas
    buscarPorPessoa(idPessoa: String): Observable<Response> {
        return this.http.get<Response>(`${API_CONFIG.baseUrl}/notificacao/pessoa/` + idPessoa);
    }

    enviarEmail(notificacao: Array<Notificacao>): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/notificacao/enviaEmail`, notificacao);
    }

    enviarEmailAvulso(notificacao: Notificacao): Observable<Response> {
        return this.http.post<Response>(`${API_CONFIG.baseUrl}/notificacao/enviaEmailAvulso`, notificacao);
    }
}