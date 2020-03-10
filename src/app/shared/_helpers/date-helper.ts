import { Hora } from '../_models';

export class DateHelper {

    static montarDataHora(date: Date, hora: Hora): Date {

        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hora.hour, hora.minute, hora.second);
    }

    static montarStringDataHoraEng(data: Date, hora?: Hora): string {// return yyyy/mm/dd hh:mm:ss

        let optDate = hora != null ? new Date(data.getFullYear(), data.getMonth(), data.getDate(), hora.hour, hora.minute, hora.second) : data;
        return `${optDate.getFullYear()}/${this.validarData(optDate, 1)}/${this.validarData(optDate, 2)} ${this.validarData(optDate, 3)}:${this.validarData(optDate, 4)}:${optDate.getSeconds()}`;
    }

    static montarStringDataEng(data: Date): string {

        return `${data.getFullYear()}/${this.validarData(data, 1)}/${this.validarData(data, 2)}`;
    }

    static montarStringData(data: Date): string {

        return `${this.validarData(data, 2)}/${this.validarData(data, 1)}/${data.getFullYear()}`;
    }

    static montarStringHoraMinuto(date: Date, hora?: Hora): string {

        let optDate = hora != null ? new Date(0, 0, 0, hora.hour, hora.minute, 0) : date;
        return `${this.validarData(optDate, 3)}:${this.validarData(optDate, 4)}`;
    }

    static validarData(valor: Date, tipoValor: number): string | null {

        // Mes
        if (tipoValor == 1) {
            return valor.getMonth() < 10 ? `0${valor.getMonth()}` : (valor.getMonth() + 1).toString();
        }

        // Dia
        if (tipoValor == 2) {
            return valor.getDate() < 10 ? `0${valor.getDate()}` : valor.getDate().toString();
        }

        // Hora
        if (tipoValor == 3) {
            return valor.getHours() < 10 ? `0${valor.getHours()}` : valor.getHours().toString();
        }

        //Minuto
        if (tipoValor == 4) {
            return valor.getMinutes() < 10 ? `0${valor.getMinutes()}` : valor.getMinutes().toString();
        }

        return null;
    }
}

