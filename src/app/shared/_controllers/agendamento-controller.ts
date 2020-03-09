import { AgendamentoService } from '../_services';
import { Agendamento, Hora } from '../_models';
import { DateHelper } from '../_helpers';

export class AgendamentoController {

    constructor(private agendamentoService: AgendamentoService) { }

    msgNotificacaoPadrao(data: Date, horaInicio: Date, horaFim: Date, responsavel: string): string {
        return `Você possui uma nova reunião na data ${DateHelper.montarStringData(data)} 
        no período das ${DateHelper.montarStringHoraMinuto(horaInicio)}
        às ${DateHelper.montarStringHoraMinuto(horaFim)} marcada por ${responsavel}.`
    }

    msgNotificacaoPartObrigatorio(data: Date, horaInicio: Date, horaFim: Date, responsavel: string): string {

        return `Você é uma pessoa Obrigatória na nova reunião marcada por ${responsavel} 
        na data ${DateHelper.montarStringData(data)} no período das ${DateHelper.montarStringHoraMinuto(horaInicio)} 
        às ${DateHelper.montarStringHoraMinuto(horaFim)}.`;
    }

    assuntoPadrao(responsavel: string): string {

        return `Nova Reunião Marcada por ${responsavel}`;
    }

    async buscarTodos(): Promise<Agendamento[]> {
        return;
    }

    async adicionar(agendamento: Agendamento): Promise<Agendamento> {

        let retorno: Agendamento;
        await this.agendamentoService.adicionar(agendamento).toPromise().then(ret => {
            retorno = ret.data;
        });

        return retorno;
    }
}