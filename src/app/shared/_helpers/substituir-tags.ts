import { Agendamento, Participante } from '../_models';
import { DateHelper } from './date-helper';

export class SubstituirTags {

    static agendamento(texto: string, agendamento: Agendamento, participante: Participante): string {
        // Manter formato abaixo para melhor entendimento

        // OUTROS
        texto = texto.replace('[SAUDACAO]', this.saudacao());

        // RESERVA
        texto = texto.replace('[RESERVA_DATA]', DateHelper.montarStringData(agendamento.ageData));
        texto = texto.replace('[RESERVA_HORA_INICIO]', DateHelper.montarStringHoraMinuto(agendamento.ageHoraInicio));
        texto = texto.replace('[RESERVA_HORA_FIM]', DateHelper.montarStringHoraMinuto(agendamento.ageHoraFim));
        texto = texto.replace('[RESERVA_RESPONSAVEL]', agendamento.agePesResponsavel.pesNome.trim());
        texto = texto.replace('[RESERVA_ASSUNTO]', agendamento.ageAssunto.trim());

        //PARTICIPANTE/PESSOA
        texto = texto.replace('[PARTICIPANTE_NOME]', participante.parPessoa.pesNome.trim());

        return texto;
    }

    private static saudacao(): string {
        let data = new Date().getHours();

        let saudacao = 'Bom dia'

        if (data > 12 && data < 18) {
            saudacao = 'Boa tarde';

        } else if (data >= 18 && data < 0) {
            saudacao = 'Boa Noite';
        }

        return saudacao;
    }
}


