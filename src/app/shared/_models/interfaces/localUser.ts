import { Pessoa } from './pessoa';

export interface LocalUser {
    
    token: string;
    pesEmail: string;
    logado: Boolean;
    pessoa: Pessoa;
}
