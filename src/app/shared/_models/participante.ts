import { Pessoa } from './pessoa';
import { Agendamento } from './agendamento';

export interface Participante {

    parId: number;
    parTipo: number;
    parConfirmado: boolean | null;
    parPessoa: Pessoa;
    parAgendamento: Agendamento | null
}