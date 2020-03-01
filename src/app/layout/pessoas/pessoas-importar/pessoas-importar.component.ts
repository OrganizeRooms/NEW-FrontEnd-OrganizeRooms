import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Pessoa, Unidade, SessionStorageService, PessoaService } from 'src/app/shared';
import { toInteger } from 'src/app/shared/utils/util';

@Component({
    selector: 'app-pessoas-importar',
    templateUrl: './pessoas-importar.component.html',
    styleUrls: ['./pessoas-importar.component.scss'],
    //animations: [routerTransition()]
})
export class PessoasImportarComponent implements OnInit, OnDestroy {

    constructor(
        private sessionStorage: SessionStorageService,
        private PessoaService: PessoaService
    ) { }

    csvRecords: Pessoa[] = [];
    importLiberado = false
    inconsistencias = null;

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

    importarPessoas() {
        this.PessoaService.adicionarLista(this.csvRecords).subscribe(ret => {
            if (ret.data != null || ret.data != '') {
                this.inconsistencias = ret.data
            } else {
                this.inconsistencias = ''
            }
        });
        return false;
    }

    getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
        let dataArr = [];

        for (let i = 1; i < csvRecordsArray.length; i++) {
            let data = (<string>csvRecordsArray[i]).split(';');

            // FOR EACH ROW IN CSV FILE IF THE NUMBER OF COLUMNS
            // ARE SAME AS NUMBER OF HEADER COLUMNS THEN PARSE THE DATA
            if (data.length == headerLength) {
                // nome;e-mail;ddd;telefone;unidade

                let unidade: Unidade = {
                    uniId: toInteger(data[4]),
                    uniNome: null,
                    uniAtiva: null,
                    uniPesCadastro: null,
                    uniDtCadastro: null,
                    uniPesAtualizacao: null,
                    uniDtAtualizacao: null,
                };

                let csvRecord: Pessoa = {
                    pesId: null,
                    pesNome: data[0].trim(),
                    pesEmail: data[1].trim(),
                    pesDdd: data[2].trim(),
                    pesTelefone: data[3].trim(),
                    pesUnidade: unidade,
                    pesPermissao: 'ROLE_USUARIO',
                    pesDescricaoPermissao: 'Usuario',

                    // SIS = Cadastro manual
                    // IMP = Por Importação
                    pesTipoInclusao: 'IMP',

                    pesCadastro: SessionStorageService.getSessionUser().pessoa.pesId,
                    pesDtCadastro: new Date(),

                    pesAtualizacao: SessionStorageService.getSessionUser().pessoa.pesId,
                    pesDtAtualizacao: new Date(),
                    /// SOMENTE FRONT
                    participanteObrigatorio: null
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
    getHeaderArray(csvRecordsArr: any) {
        let headers = (<string>csvRecordsArr[0]).split(';');
        let headerArray = [];
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

