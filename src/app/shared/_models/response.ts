import { Pessoa } from './pessoa';

export interface Response {
    
    data: any;
    erros: any;
    dadosMap: any;
    pessoa: Pessoa;
}
