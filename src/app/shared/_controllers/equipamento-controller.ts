import { EquipamentoService } from '../_services';
import { Equipamento, AgendamentoContext } from '../_models';
export class EquipamentoController {

    constructor(private equipamentoService: EquipamentoService) { }

    async buscarTodos(): Promise<Equipamento[]> {

        let lista: Equipamento[];
        await this.equipamentoService.buscarTodos()
            .toPromise()
            .then(ret => {
                lista = ret.data;
            });

        return lista;
    }

    async buscarDisponiveis(agendamentoContext: AgendamentoContext): Promise<Equipamento[]> {

        let lista: Equipamento[];
        await this.equipamentoService.buscarDisponiveis(agendamentoContext).toPromise().then(ret => {
            lista = ret.data
        });

        return lista;
    }

    async adicionar(equipamento: Equipamento): Promise<Equipamento> {

        let retorno: Equipamento;
        await this.equipamentoService.adicionar(equipamento)
            .toPromise()
            .then(ret => {
                retorno = ret.data
            });

        return retorno;
    }

    async deletar(id: number): Promise<boolean> {

        let retorno: boolean;
        await this.equipamentoService.deletar(id.toString())
            .toPromise()
            .then(ret => {
                retorno = ret.data
            })

        return retorno;
    }
}
