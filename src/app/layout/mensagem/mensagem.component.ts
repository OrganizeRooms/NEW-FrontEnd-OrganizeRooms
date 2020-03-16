import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { OrganizeRoomsService, SessionStorageService, MensagemService, EquipamentoService } from 'src/app/shared/_services';
import { Unidade, Mensagem } from 'src/app/shared/_models';
import { SubstituirTags } from 'src/app/shared';

@Component({
    selector: 'app-mensagem',
    templateUrl: './mensagem.component.html',
    styleUrls: ['./mensagem.component.scss'],
    animations: [routerTransition()]
})
export class MensagemComponent implements OnInit {

    permissao: string;
    listaMensagens = new Array<Mensagem>();

    constructor(
        private OrganizeRoomsService: OrganizeRoomsService<Unidade>,
        private sessionStorageService: SessionStorageService,
        private mensagemService: MensagemService,
    ) { }

    ngOnInit() {
        this.carregarDados();

        if (this.listaMensagens) {
            this.carregarMensagensPadrao();
        }
    }

    carregarDados() {
        this.mensagemService.buscarTodos().subscribe(ret => {
            this.listaMensagens = ret.data;
        })
    }

    carregarMensagensPadrao() {
        this.mensagemService.buscarMensagensPadrao().subscribe(ret => {
            this.listaMensagens = ret.data;
        });
    }

    editar(registro: Unidade) {

    }

    modalTagsDisp() {


    }

    validarTamanho(msg: string): number {

        let length = msg.length;

        if (length <= 85) return 1;
        if (length > 85 && length < 165) return 2;
        return 3;
    }

    removerEspacosTextArea() {
        let textarea = document.querySelectorAll('#menMensagem');

        if (textarea.length > 0) {
            textarea.forEach(msg => {
                if (msg.textContent) {

                    msg.textContent = msg.textContent.trim();
                }
            })
        }
    }
}