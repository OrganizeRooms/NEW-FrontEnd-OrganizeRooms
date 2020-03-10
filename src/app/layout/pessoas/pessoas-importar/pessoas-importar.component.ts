import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { routerTransition } from '../../../router.animations';

import { toInteger } from 'src/app/shared/utils/util';
import { SessionStorageService } from 'src/app/shared/_services';
import { Pessoa, Unidade } from 'src/app/shared/_models';
import { PessoaController, UnidadeController } from 'src/app/shared/_controllers';

@Component({
    selector: 'app-pessoas-importar',
    templateUrl: './pessoas-importar.component.html',
    styleUrls: ['./pessoas-importar.component.scss'],
    animations: [routerTransition()]
})
export class PessoasImportarComponent implements OnInit, OnDestroy {

    constructor(
        private sessionStorageService: SessionStorageService,
        private pessoaController: PessoaController,
        private unidadeController: UnidadeController
    ) { }

    csvRecords: Pessoa[] = [];
    importLiberado = false
    inconsistencias: string[];

    @ViewChild('fileImportInput', { static: true }) fileImportInput: any;

    ngOnInit() { }

    ngOnDestroy() {
        this.fileReset()
    }

    fileChangeListener($event: any): void {

        let files = $event.srcElement.files;

        if (this.isCSVFile(files[0])) {

            let input = $event.target;
            let reader = new FileReader();
            reader.readAsText(input.files[0]);

            reader.onload = () => {
                let csvData = reader.result;
                let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

                let headersRow = this.getHeaderArray(csvRecordsArray);

                this.csvRecords = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
                this.importLiberado = true

            };

            reader.onerror = function () {
                alert('Não foi possível Ler ' + input.files[0]);
            };

        } else {
            alert("Por favor, importe um arquivo .csv.");
            this.fileReset();
        }
    }

    async importarPessoas() {
        this.inconsistencias = await this.pessoaController.adicionarLista(this.csvRecords);
    }

    getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any): Pessoa[] {
        let dataArr = new Array<Pessoa>();

        for (let i = 1; i < csvRecordsArray.length; i++) {
            let data = (<string>csvRecordsArray[i]).split(';');

            // FOR EACH ROW IN CSV FILE IF THE NUMBER OF COLUMNS
            // ARE SAME AS NUMBER OF HEADER COLUMNS THEN PARSE THE DATA
            if (data.length == headerLength) {
                // nome;e-mail;ddd;telefone;unidade

                let csvRecord: Pessoa = {
                    pesId: 0,
                    pesNome: data[0].trim(),
                    pesEmail: data[1].trim(),
                    pesDdd: data[2].trim(),
                    pesTelefone: data[3].trim(),
                    pesUnidade: this.unidadeController.montarUnidadeComId(toInteger(data[4])),
                    pesPermissao: 'ROLE_USUARIO',
                    pesDescricaoPermissao: 'Usuario',

                    // SIS = Cadastro manual
                    // IMP = Por Importação
                    pesTipoInclusao: 'IMP',

                    pesCadastro: this.sessionStorageService.getValue().pessoa.pesId,
                    pesDtCadastro: new Date(),

                    pesAtualizacao: this.sessionStorageService.getValue().pessoa.pesId,
                    pesDtAtualizacao: new Date(),
                    /// SOMENTE FRONT
                    participanteObrigatorio: false
                };

                dataArr.push(csvRecord);
            }
        }
        return dataArr;
    }

    // CHECK IF FILE IS A VALID CSV FILE
    isCSVFile(file: any) {
        return file.name.endsWith(".csv");
    }

    // GET CSV FILE HEADER COLUMNS
    getHeaderArray(csvRecordsArr: any): string[] {
        let headers = (<string>csvRecordsArr[0]).split(';');
        let headerArray = new Array<string>();
        for (let j = 0; j < headers.length; j++) {
            headerArray.push(headers[j]);
        }
        return headerArray;
    }

    fileReset() {
        this.fileImportInput.nativeElement.value = "";
        this.csvRecords = [];
        this.importLiberado = false
    }

}

