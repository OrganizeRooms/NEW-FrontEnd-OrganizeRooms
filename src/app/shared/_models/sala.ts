import { Pessoa } from './pessoa';
import { Unidade } from './unidade';

export interface Sala {
    salaId: number;
    salaNome: string;
    salaLotacao: number;
    salaAtiva: boolean;
    salaPesCadastro: Number;
    salaDtCadastro: Date;
    salaPesAtualizacao: Number;
    salaDtAtualizacao: Date;
    salaUnidade: Unidade;
}