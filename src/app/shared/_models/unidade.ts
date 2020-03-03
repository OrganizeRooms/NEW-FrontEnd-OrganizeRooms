import { UnidadeService } from '../_services';

export interface Unidade {

    uniId: number,
    uniNome: string,
    uniAtiva: boolean,
    uniPesCadastro: number,
    uniDtCadastro: Date,
    uniPesAtualizacao: number,
    uniDtAtualizacao: Date
}