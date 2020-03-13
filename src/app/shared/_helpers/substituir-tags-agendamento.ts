import { Agendamento } from '../_models';
import { DateHelper } from './date-helper';

export function substituirTagsAgendamento(texto: string, agendamento: Agendamento): string {

    texto = texto.replace('[RESERVA_DATA]',        DateHelper.montarStringData(agendamento.ageData));
    texto = texto.replace('[RESERVA_HORA_INICIO]', DateHelper.montarStringHoraMinuto(agendamento.ageHoraInicio));
    texto = texto.replace('[RESERVA_HORA_FIM]',    DateHelper.montarStringHoraMinuto(agendamento.ageHoraFim));
    texto = texto.replace('[RESERVA_RESPONSAVEL]', agendamento.agePesResponsavel.pesNome.trim());
    texto = texto.replace('[RESERVA_ASSUNTO]',     agendamento.ageAssunto.trim());

    return texto;
}