import { Injectable } from '@angular/core';
import { API_CONFIG } from '../_config';
import { JwtAuthentication, Response, LocalUser } from 'src/app/shared/_models';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { SessionStorageService } from './sessionStorage.service';
import { Router } from '@angular/router';
import { retry, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) { }

  authenticate(creds: JwtAuthentication): Observable<HttpResponse<string>> {
    return this.http.post(
      `${API_CONFIG.baseUrl}/login`,
      creds,
      { observe: 'response', responseType: 'text' }
    ).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  verificarEmail(email: JwtAuthentication): Observable<Response> {
    return this.http
      .post<Response>(
        `${API_CONFIG.baseUrl}/login/verificarEmail`,
        email
      ).pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  novaSenha(novaSenha: JwtAuthentication): Observable<Response> {
    return this.http
      .post<Response>(
        `${API_CONFIG.baseUrl}/login/novaSenha`,
        novaSenha
      ).pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  deslogar() {
    this.loginSemSucesso();
    this.router.navigate(['/login']);
  }

  loginComSucesso(ret: Response): void {

    let user: LocalUser = {
      token: ret.data.token || '',
      pesEmail: ret.pessoa.pesEmail || '',
      logado: true,
      pessoa: ret.pessoa
    };
    this.sessionStorageService.setValue(user);
  }

  loginSemSucesso(): void {
    this.sessionStorageService.setValue(null);
  }

  protected handleError(error: HttpErrorResponse) {

    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;

    } else {
      if (error.status == 401) {
        errorMessage = `Credenciais de acesso inválidas!`;
        console.log(`Status: ${error.status}, Mensagem: ${error.error}`);

      } else {
        // Erro ocorreu no lado do servidor
        errorMessage = `Código do erro: ${error.status}, mensagem: ${error.message}`;
      }
    }

    console.log(errorMessage);
    return throwError(errorMessage);
  };

}