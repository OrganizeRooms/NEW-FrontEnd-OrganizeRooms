export class Mensagem {

    menId: number;
    menDescricao: string;
    menMensagem: string;
    /*
     ***** TIPOS ******
    1 = Assunto E-mail de Agendamento
    2 = E-mail agendamento para Participante Comum
    3 = E-mail agendamento para Participante Obrigatório
    4 = Assunto E-mail retirado da Reunião
    5 = E-mail retirado da Reunião
    */
    menTipo: number;
    menDtAtualizacao: Date;
    menPesAtualizacao: number;

}