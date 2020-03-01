import { Injectable } from '@angular/core';

import { API_CONFIG } from '../../shared/_config';
import { LocalUser, JwtAuthentication, Response, Service } from '../_models';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionStorageService } from './sessionStorage.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends Service {

  //pessoaLogada: EventEmitter<Boolean> = new EventEmitter();
  private router: Router

  authenticate(creds: JwtAuthentication) {

    return this.http.post(
      `${API_CONFIG.baseUrl}/login`,
      creds,
      { observe: 'response', responseType: 'text' }
    );
  }

  verificarEmail(email: JwtAuthentication): Observable<Response> {
    return this.http.post<Response>(`${API_CONFIG.baseUrl}/login/verificarEmail`, email);
  }

  novaSenha(novaSenha: JwtAuthentication): Observable<Response> {
    return this.http.post<Response>(`${API_CONFIG.baseUrl}/login/novaSenha`, novaSenha);
  }

  successfulLogin(ret) {

    const user: LocalUser = {
      token: ret.data.token,
      pesEmail: ret.pessoa.pesEmail,
      logado: true,
      pessoa: ret.pessoa
    };

    SessionStorageService.setSessionUser(user);
    // this.pessoaLogada.emit(true);
    if (ret.pessoa.pesPermissao == 'ROLE_TABLET') {
      this.router.navigate(['/tablet']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  noSuccessfulLogin() {
    const user: LocalUser = {
      token: '',
      pesEmail: '',
      logado: false,
      pessoa: null
    };

    SessionStorageService.setSessionUser(null);
    //this.pessoaLogada.emit(false);
  }
}