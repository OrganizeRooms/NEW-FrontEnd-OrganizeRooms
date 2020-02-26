import { Pessoa } from './pessoa';
import { Agendamento } from './agendamento';

export interface Participante {
    parId: number;
    parTipo: number;
    parConfirmado: Boolean;
    parPessoa: Pessoa;
    parAgendamento: Agendamento
}