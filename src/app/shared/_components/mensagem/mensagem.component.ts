import { Component, OnInit, Input } from '@angular/core';
import { Mensagem } from '../../_models';

@Component({
    selector: 'app-mensagem',
    templateUrl: './mensagem.component.html'
})
export class MensagemComponent implements OnInit {

    @Input() tipo: string;

    constructor() {}

    ngOnInit() {}
}
