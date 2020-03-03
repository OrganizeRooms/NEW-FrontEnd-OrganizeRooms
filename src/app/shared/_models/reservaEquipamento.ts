import { Agendamento } from './agendamento';
import { Equipamento } from './equipamento';

export interface ReservaEquipamento {
    
    resId: number;
    equipamento: Equipamento;
    agendamento: Agendamento
}