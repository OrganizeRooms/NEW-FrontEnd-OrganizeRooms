import { NotificacaoService } from '../_services';
import { Notificacao } from '../_models';

export class NotificacaoController {

    constructor(private notificacaoService: NotificacaoService) { }

    async buscarTodosPorIdPessoa(id: number): Promise<Notificacao[]> {

        let lista: Notificacao[];
        await this.notificacaoService.buscarPorPessoa(id.toString())
            .toPromise()
            .then(ret => {
                lista = ret.data || null;
            });

        return lista;
    }

    async atualizar(notificacao: Notificacao): Promise<Notificacao> {

        let resposta: Notificacao;
        await this.notificacaoService.atualizar(notificacao)
            .toPromise()
            .then(ret => {
                resposta = ret.data;
            });

        return resposta;
    }

    async enviarEmail(notificacoes: Notificacao[]): Promise<boolean> {

        let retorno: boolean;
        await this.notificacaoService.enviarEmail(notificacoes)
            .toPromise()
            .then(ret => {
                retorno = ret.data;
            });

        return retorno;
    }
}