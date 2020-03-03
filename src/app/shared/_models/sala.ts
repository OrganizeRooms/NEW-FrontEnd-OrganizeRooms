import { Unidade } from './unidade';

export interface Sala {

    salaId: number;
    salaNome: string;
    salaLotacao: number;
    salaAtiva: boolean;
    salaPesCadastro: number;
    salaDtCadastro: Date;
    salaPesAtualizacao: number;
    salaDtAtualizacao: Date;
    salaUnidade: Unidade;
}