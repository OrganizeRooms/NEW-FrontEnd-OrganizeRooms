
// Pega Data e Hora e retorna um DateTime
export function montarDataHora(data, hora): Date {
    var dataHora = new Date(data.year, data.month, data.day, hora.hour, hora.minute, hora.second);
    return dataHora;
}

export function montarStringDataHora(parData, parHora) {

    var mes = this.validarData(parData, 1);
    var dia = this.validarData(parData, 2);
    var hora = this.validarData(parHora, 3);
    var minuto = this.validarData(parHora, 4);

    var dataHora = parData.year + '/' + mes + '/' + dia + ' ' + hora + ':' + minuto + ':' + parData.second;
    return dataHora;
}

export function montarStringDataEng(data) {

    var mes = this.validarData(data, 1);
    var dia = this.validarData(data, 2);

    var stringData = data.year + '/' + mes + '/' + dia
    return stringData
}

export function montarStringDataPtBr(data) {

    var mes = this.validarData(data, 1);
    var dia = this.validarData(data, 2);

    var stringData = dia + '/' + mes + '/' + data.year
    return stringData
}

export function montarStringHoraMinuto(horaMinuto) {

    var hora = this.validarData(horaMinuto, 3);
    var minuto = this.validarData(horaMinuto, 4);

    var stringHoraMinuto = hora + ':' + minuto
    return stringHoraMinuto
}

export function validarData(valor, tipoValor) {

    var mes;        /// TIPO 1
    var dia;        /// TIPO 2
    var hora;       /// TIPO 3
    var minuto;     /// TIPO 4

    // Mes
    if (tipoValor == 1) {
        if (valor.month < 10) {
            mes = '0' + valor.month
        } else {
            mes = valor.month
        }
        return mes
    }

    // Dia
    if (tipoValor == 2) {
        if (valor.day < 10) {
            dia = '0' + valor.day
        } else {
            dia = valor.day
        }
        return dia
    }

    // Hora
    if (tipoValor == 3) {
        if (valor.hour < 10) {
            hora = '0' + valor.hour
        } else {
            hora = valor.hour
        }
        return hora
    }

    if (tipoValor == 4) {
        if (valor.minute < 10) {
            minuto = '0' + valor.minute
        } else {
            minuto = valor.minute
        }
        return minuto
    }
}

