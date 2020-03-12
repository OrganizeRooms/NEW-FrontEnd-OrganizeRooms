import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MensagemComponent } from './mensagem.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [MensagemComponent],
    exports: [MensagemComponent]
})
export class MensagemModule {}
