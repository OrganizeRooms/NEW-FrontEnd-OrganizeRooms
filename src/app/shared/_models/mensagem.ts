export class Mensagem {


    menId: number;
    menMensagem: string;
    menDescricao: string;
    /*
     ***** TIPOS ******
    1 = Assunto e-mail agendamento
    2 = E-mail agendamento Participante Padrão
    3 = E-mail agendamento Participante Obrigatório
    4 = Assunto e-mail retirado da reunião
    5 = E-mail retirado do agendamento
    */
    menTipo: number;
    menDtAtualizacao: Date;
    menPesAtualizacao: number;

}
    /* MENSAGENS PADRÃO
    TIPO 1:
        Nova Reunião Marcada por [RESERVA_RESPONSAVEL].

    TIPO 2:
        Você possui uma nova reunião na data [RESERVA_DATA] no período das 
        [RESERVA_HORA_INICIO] às [RESERVA_HORA_FIM] marcada por [RESERVA_RESPONSAVEL].

    TIPO 3:
        Você é uma pessoa Obrigatória na nova reunião marcada por [RESERVA_RESPONSAVEL] 
        na data [RESERVA_DATA] no período das [RESERVA_HORA_INICIO] às [RESERVA_HORA_FIM].
        
    TIPO 4:
        Retirado da Reunião Marcada por [RESERVA_RESPONSAVEL].

    TIPO 5:
        Você foi retirado da reunião marcada por [RESERVA_RESPONSAVEL] na data [RESERVA_DATA]
        no período das [RESERVA_HORA_INICIO] às [RESERVA_HORA_FIM], referente a [RESERVA_ASSUNTO].

*/