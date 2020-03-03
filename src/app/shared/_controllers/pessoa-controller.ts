import { PessoaService } from '../_services';
import { Pessoa } from '../_models';

export class PessoaController {

    constructor(private pessoaService: PessoaService) { }

    async buscarTodos(): Promise<Pessoa[]> {

        let lista: Pessoa[];
        await this.pessoaService.buscarTodos()
            .toPromise()
            .then(ret => {
                lista = ret.data;
            });

        return lista;
    }

    async adicionar(pessoa: Pessoa): Promise<Pessoa> {

        let retorno: Pessoa;
        await this.pessoaService.adicionar(pessoa)
            .toPromise()
            .then(ret => {
                retorno = ret.data;
            });

        return retorno;
    }

    async adicionarLista(listaPessoa: Pessoa[]): Promise<string[]> {

        let inconsistencias: string[]
        await this.pessoaService.adicionarLista(listaPessoa).
            toPromise()
            .then(ret => {
                inconsistencias = ret.data
            });

        return inconsistencias;
    }

    async deletar(id: number): Promise<boolean> {

        let retorno: boolean;
        await this.pessoaService.deletar(id.toString())
            .toPromise()
            .then(ret => {
                retorno = ret.data
            })

        return retorno
    }

    async resetarSenha(pessoa: Pessoa): Promise<boolean> {

        let retorno;
        await this.pessoaService.resetarSenha(pessoa)
            .toPromise()
            .then(ret => {
                retorno = ret.data
            });

        return retorno;
    };
}