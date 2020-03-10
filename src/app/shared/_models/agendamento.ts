import { Pessoa } from './pessoa';
import { Sala } from './sala';
import { Participante } from './participante';
import { ReservaEquipamento } from './reservaEquipamento';

export interface Agendamento {
    ageId: number;
    ageAssunto: string;
    ageDescricao: string;
    ageSala: Sala | null;
    agePesResponsavel: Pessoa;
    ageStatus: string;
    ageData: Date;
    ageHoraInicio: Date;
    ageHoraFim: Date;
    agePesCadastro: number;
    agePesAtualizacao: number;
    ageDtCadastro: Date;
    ageDtAtualizacao: Date;
    ageEquipamentos: ReservaEquipamento[] | null;
    ageParticipantes: Participante[] | null;
}