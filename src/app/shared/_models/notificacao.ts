import { Pessoa } from './pessoa';
import { EnviaEmail } from './enviaEmail';

export interface Notificacao {
    notId: number;
    notDescricao: string;
    notAtiva: boolean;
    notPessoa: Pessoa;
    notPesCadastro: Pessoa;
    notDtCadastro: Date;
    notPesAtualizacao: Pessoa;
    notDtAtualizacao: Date;
    notEnviado: Boolean;
    enviaEmail: EnviaEmail;
}