export interface JwtAuthentication {

    pesEmail: string;
    pesSenha: string;
    pesNovaSenha: string;
}

export function montarNovoAuthentication(email = '', senha = '', novaSenha = ''): JwtAuthentication {
    return {
        pesEmail: email,
        pesSenha: senha,
        pesNovaSenha: novaSenha
    };
}