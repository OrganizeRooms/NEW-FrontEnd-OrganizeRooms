import { Pessoa } from './pessoa';
import { EnviaEmail } from './enviaEmail';

export interface Notificacao {

    notId: number,
    notDescricao: string,
    notAtiva: boolean,
    notPessoa: Pessoa,
    notPesCadastro: number,
    notDtCadastro: Date,
    notPesAtualizacao: number,
    notDtAtualizacao: Date,
    notEnviado: boolean,
    enviaEmail: EnviaEmail,
}