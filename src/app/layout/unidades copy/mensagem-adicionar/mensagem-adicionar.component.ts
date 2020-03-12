import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OrganizeRoomsService, SessionStorageService } from 'src/app/shared/_services';
import { Unidade, LocalUser } from 'src/app/shared/_models';

@Component({
    selector: 'app-mensagem-adicionar',
    templateUrl: './mensagem-adicionar.component.html',
    styleUrls: ['./mensagem-adicionar.component.scss'],
    animations: [routerTransition()],
})

export class MensagemAdicionarComponent implements OnInit, OnDestroy {

    labelPosition = 'before';
    localUser: LocalUser;
    permissao: string;
    selUnidade: Unidade;
    formAddUnidade: FormGroup;

    constructor(
      
    ) { }

    ngOnInit() {
  
    }

    ngOnDestroy() {
      
    }

    criarFormulario() {
       
    }

    adicionar() {

       
    }


    async excluir() {

    }
}
