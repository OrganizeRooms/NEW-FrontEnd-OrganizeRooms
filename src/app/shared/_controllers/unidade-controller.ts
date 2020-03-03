import { UnidadeService } from 'src/app/shared/_services';
import { Unidade } from 'src/app/shared/_models';

export class UnidadeController {

    constructor(private unidadeService: UnidadeService) { }

    async buscarTodos(): Promise<Unidade[]> {

        let lista: Unidade[];
        await this.unidadeService.buscarTodos()
            .toPromise()
            .then(ret => {
                lista = ret.data;
            });

        return lista;
    };

    adicionar(unidade: Unidade): Unidade {

        let retorno: Unidade;
        this.unidadeService.adicionar(unidade)
            .toPromise()
            .then(ret => {
                retorno = ret.data;
            });

        return retorno;
    }

    async buscarAtivas(): Promise<Unidade[]> {

        let lista: Unidade[];
        await this.unidadeService.buscarAtivas()
            .toPromise()
            .then(ret => {
                lista = ret.data;
            });

        return lista;
    }

    async deletar(id: number): Promise<boolean> {

        let retorno: boolean;
        await this.unidadeService.deletar(id.toString())
            .toPromise()
            .then(ret => {
                retorno = ret.data;
            });

        return retorno;
    };

}
