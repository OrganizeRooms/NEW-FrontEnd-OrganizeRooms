import { AuthenticationService, SessionStorageService } from '../_services';
import { JwtAuthentication, LocalUser, Response } from '../_models';
import { Router } from '@angular/router';

export class AuthenticationController {

    constructor(
        private authenticationService: AuthenticationService,
        private sessionStorageService: SessionStorageService,
        private router: Router
    ) { }

    async autenticar(credenciais: JwtAuthentication): Promise<boolean> {

        let retorno = true;
        await this.authenticationService.authenticate(credenciais).toPromise().then(response => {
            const aux = JSON.parse(response.body);
            this._successfulLogin(aux);
        }, error => {
            this._noSuccessfulLogin();
            retorno = false;
        });

        return retorno;
    }

    deslogar() {
        this._noSuccessfulLogin();
        this.router.navigate(['/login']);
    }

    async alterarSenha(senha: JwtAuthentication): Promise<boolean> {

        let retorno: boolean;
        await this.authenticationService.novaSenha(senha).toPromise().then(ret => {
            retorno = ret.data
        })

        return retorno;
    }

    async verificarEmail(email: JwtAuthentication): Promise<boolean> {

        let retorno: boolean
        await this.authenticationService.verificarEmail(email).toPromise().then(ret => {
            retorno = ret.data;
        })

        return retorno;
    }

    private _successfulLogin(ret: Response): void {

        let user: LocalUser = {
            token: ret.data.token || '',
            pesEmail: ret.pessoa.pesEmail || '',
            logado: true,
            pessoa: ret.pessoa
        };
        this.sessionStorageService.setValue(user);

        if (ret.pessoa.pesPermissao == 'ROLE_TABLET') {
            this.router.navigate(['/tablet']);
        } else {
            this.router.navigate(['/home']);
        }
    }

    private _noSuccessfulLogin(): void {
        this.sessionStorageService.setValue(null);
    }

    montarNovoAuthentication(): JwtAuthentication {
        return {
            pesEmail: '',
            pesSenha: '',
            pesNovaSenha: ''
        };
    }
}
