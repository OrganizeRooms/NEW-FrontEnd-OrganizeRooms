import { SalaService } from '../_services';
import { Sala, AgendamentoContext } from '../_models';

export class SalaController {

    constructor(private salaService: SalaService) { }

    async buscarTodos(): Promise<Sala[]> {

        let lista: Sala[];
        await this.salaService.buscarTodos().toPromise().then(ret => {
            lista = ret.data;
        });

        return lista;
    }

    async buscarDisponiveis(agendamentoContext: AgendamentoContext): Promise<Sala[]> {

        let lista: Sala[];
        await this.salaService.buscarDisponiveis(agendamentoContext).toPromise().then(ret => {
            lista = ret.data;
        });

        return lista;
    }

    async adicionar(sala: Sala): Promise<Sala> {

        let retorno: Sala;
        await this.salaService.adicionar(sala).toPromise().then(ret => {
            retorno = ret.data
        });

        return retorno;
    }

    async deletar(id: number): Promise<boolean> {

        let retorno: boolean;
        await this.salaService.deletar(id.toString()).toPromise().then(ret => {
            retorno = ret.data;
        })

        return retorno
    }
}