import { Pessoa } from './pessoa';
import { Sala } from './sala';
import { Participante } from './participante';
import { ReservaEquipamento } from './reservaEquipamento';

export interface Agendamento {

    ageId: number,
    ageAssunto: string,
    ageDescricao: string,
    ageSala: Sala,
    agePesResponsavel: Pessoa,
    ageStatus: string,
    ageData: Date,
    ageHoraInicio: Date,
    ageHoraFim: Date,
    agePesCadastro: number,
    agePesAtualizacao: number,
    ageDtCadastro: Date,
    ageDtAtualizacao: Date,
    ageEquipamentos: ReservaEquipamento[],
    ageParticipantes: Participante[]

}

export function montarAgendamentoComId(id: number): Agendamento {

    return {
        ageId: id,
        ageAssunto: '',
        ageDescricao: '',
        ageSala: null,
        agePesResponsavel: null,
        ageStatus: '',
        ageData: new Date(),
        ageHoraInicio: new Date(),
        ageHoraFim: new Date(),
        agePesCadastro: 0,
        agePesAtualizacao: 0,
        ageDtCadastro: new Date(),
        ageDtAtualizacao: new Date(),
        ageEquipamentos: new Array<ReservaEquipamento>(),
        ageParticipantes: new Array<Participante>()
    };
}

    /* 
        constructor(
            public ageId: number,
            public ageAssunto: string,
            public ageDescricao: string,
            public ageSala: Sala,
            public agePesResponsavel: Pessoa,
            public ageStatus: string,
            public ageData: Date,
            public ageHoraInicio: Date,
            public ageHoraFim: Date,
            public agePesCadastro: number,
            public agePesAtualizacao: number,
            public ageDtCadastro: Date,
            public ageDtAtualizacao: Date,
            public ageEquipamentos?: ReservaEquipamento[],
            public ageParticipantes?: Participante[]
        ) { }
    
        static montarAgendamentoComId(id: number): Agendamento {
    
            return new Agendamento(
                id,
                '',
                '',
                null,
                null,
                '',
                new Date(),
                new Date(),
                new Date(),
                0,
                0,
                new Date(),
                new Date()
            );
        }
    
        get msgEmailPadrao(): string {
            return `Você possui uma nova reunião na data ${DateHelper.montarStringData(this.ageData)} 
            no período das ${DateHelper.montarStringHoraMinuto(this.ageHoraInicio)}
            às ${DateHelper.montarStringHoraMinuto(this.ageHoraFim)} marcada por ${this.agePesResponsavel}.`
        }
    
        get msgEmailPartObrigatorio(): string {
    
            return `Você é uma pessoa Obrigatória na nova reunião marcada por ${this.agePesResponsavel} 
            na data ${DateHelper.montarStringData(this.ageData)} no período das ${DateHelper.montarStringHoraMinuto(this.ageHoraInicio)} 
            às ${DateHelper.montarStringHoraMinuto(this.ageHoraFim)}.`;
        }
    
        get assuntoEmailPadrao(): string {
    
            return `Nova Reunião Marcada por ${this.agePesResponsavel}`;
        }*/

    /*static msgEmailPadrao(data: Date, horaInicio: Date, horaFim: Date, responsavel: string): string {
        return `Você possui uma nova reunião na data ${DateHelper.montarStringData(data)} 
        no período das ${DateHelper.montarStringHoraMinuto(horaInicio)}
        às ${DateHelper.montarStringHoraMinuto(horaFim)} marcada por ${responsavel}.`
    }

    static msgEmailPartObrigatorio(data: Date, horaInicio: Date, horaFim: Date, responsavel: string): string {

        return `Você é uma pessoa Obrigatória na nova reunião marcada por ${responsavel} 
        na data ${DateHelper.montarStringData(data)} no período das ${DateHelper.montarStringHoraMinuto(horaInicio)} 
        às ${DateHelper.montarStringHoraMinuto(horaFim)}.`;
    }

    static assuntoEmailPadrao(responsavel: string): string {

        return `Nova Reunião Marcada por ${responsavel}`;
    }*/