import { Unidade } from './unidade';

export interface Pessoa {

    pesId: number;
    pesEmail: string;
    pesNome: string;
    pesPermissao: string;
    pesDescricaoPermissao: string;
    pesUnidade: Unidade;
    pesDdd: string;
    pesTelefone: string;

    // SIS = Cadastro manual
    // IMP = Por Importação
    pesTipoInclusao: string;

    pesCadastro: Number;
    pesDtCadastro: Date;

    pesAtualizacao: Number;
    pesDtAtualizacao: Date;

    /// SOMENTE FRONT
    participanteObrigatorio: Boolean;
}