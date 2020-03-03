import { Pessoa } from './pessoa';
import { Agendamento } from './agendamento';

export interface Participante {
    
    parId: number;
    parTipo: number;
    parConfirmado: boolean;
    parPessoa: Pessoa;
    parAgendamento: Agendamento
}