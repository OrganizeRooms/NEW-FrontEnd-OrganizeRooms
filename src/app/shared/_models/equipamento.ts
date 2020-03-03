import { Unidade } from './unidade';

export interface Equipamento {

    equId: number;
    equNome: string;
    equDescricao: string;
    equAtiva: string;
    equUnidade: Unidade;
    equPesCadastro: number;
    equDtCadastro: Date;
    equPesAtualizacao: number;
    equDtAtualizacao: Date;
}