import { UnidadeService } from 'src/app/shared/_services';
import { Unidade } from 'src/app/shared/_models';
import { error } from 'util';
import { Subscription } from 'rxjs';

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

    async buscarAtivas(): Promise<Unidade[]> {

        let lista: Unidade[];
        await this.unidadeService.buscarAtivas()
            .toPromise()
            .then(ret => {
                lista = ret.data;
            });

        return lista;
    }

    async buscarPorId(id: number): Promise<Unidade> {

        let retorno: Unidade;
        await this.unidadeService.buscarPorId(id.toString())
            .toPromise()
            .then(ret => {
                retorno = ret.data;
            });

        return retorno;
    }

    adicionar(unidade: Unidade): Unidade {

        let retorno: Unidade;
        this.unidadeService.adicionar(unidade)
            .toPromise()
            .then(ret => {
                retorno = ret.data;
            });

        return retorno;
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

    montarUnidadeComId(id: number): Unidade {
        return {
            uniId: id,
            uniNome: null,
            uniAtiva: null,
            uniPesCadastro: null,
            uniDtCadastro: null,
            uniPesAtualizacao: null,
            uniDtAtualizacao: null
        }
    }

}
