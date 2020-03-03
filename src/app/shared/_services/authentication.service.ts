import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../shared/_config';
import { JwtAuthentication, Response } from 'src/app/shared/_models';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  authenticate(creds: JwtAuthentication): Observable<HttpResponse<string>> {
    return this.http.post(
      `${API_CONFIG.baseUrl}/login`,
      creds,
      { observe: 'response', responseType: 'text' });
  }

  verificarEmail(email: JwtAuthentication): Observable<Response> {
    return this.http.post<Response>(`${API_CONFIG.baseUrl}/login/verificarEmail`, email);
  }

  novaSenha(novaSenha: JwtAuthentication): Observable<Response> {
    return this.http.post<Response>(`${API_CONFIG.baseUrl}/login/novaSenha`, novaSenha);
  }

}