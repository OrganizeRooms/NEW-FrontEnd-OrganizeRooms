export interface Unidade {

    uniId: number,
    uniNome: string,
    uniAtiva: boolean,
    uniPesCadastro: number,
    uniDtCadastro: Date,
    uniPesAtualizacao: number,
    uniDtAtualizacao: Date

}

export function montarUnidadeComId(id: number): Unidade {
    return {
        uniId: id,
        uniNome: '',
        uniAtiva: false,
        uniPesCadastro: 0,
        uniDtCadastro: new Date(),
        uniPesAtualizacao: 0,
        uniDtAtualizacao: new Date()
    }
}