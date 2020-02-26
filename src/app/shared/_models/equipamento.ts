import { Pessoa } from './pessoa';
import { Unidade } from './unidade';

export interface Equipamento {
    equId: number;
    equNome: string;
    equDescricao: string;
    equAtiva: String;
    equUnidade: Unidade;
    equPesCadastro: Number;
    equDtCadastro: Date;
    equPesAtualizacao: Number;
    equDtAtualizacao: Date;
}