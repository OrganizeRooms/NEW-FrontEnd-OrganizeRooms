import { AgendamentoService } from '../_services';
import { Agendamento } from '../_models';

export class AgendamentoController {

    constructor(private agendamentoService: AgendamentoService) { }

    async buscarTodos(): Promise<Agendamento[]> {
        return;
    }
}