import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OrganizeRoomsService, SessionStorageService, UnidadeService, SalaService, } from 'src/app/shared/_services';
import { Sala, Unidade, LocalUser, montarUnidadeComId } from 'src/app/shared/_models';

@Component({
    selector: 'app-salas-adicionar',
    templateUrl: './salas-adicionar.component.html',
    styleUrls: ['./salas-adicionar.component.scss'],
    animations: [routerTransition()],
})

export class SalasAdicionarComponent implements OnInit, OnDestroy {

    labelPosition = 'before';
    localUser: LocalUser;
    permissao: string;
    formAddSala: FormGroup;
    listUnidades: Unidade[];
    selSala: Sala;
    selUnidade = new FormControl();

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private organizeRoomsService: OrganizeRoomsService<Sala>,
        private sessionStorageService: SessionStorageService,
        private salaService: SalaService,
        private unidadeService: UnidadeService
    ) { }

    ngOnInit() {
        this.selSala = this.organizeRoomsService.getValue();
        this.localUser = this.sessionStorageService.getValue();
        this.permissao = this.localUser.pessoa.pesPermissao;

        this.carregarUnidades();
        this.criarFormulario();
    }

    ngOnDestroy() {
        this.organizeRoomsService.setValue(null)
    }

    carregarUnidades() {
        this.unidadeService.buscarAtivas().subscribe(ret => {
            this.listUnidades = ret.data;
        });
    }

    criarFormulario() {

        if (this.selSala) {
            this.formAddSala = this.formBuilder.group({
                salaId: [this.selSala.salaId],
                salaNome: [this.selSala.salaNome, Validators.compose([Validators.required])],
                salaLotacao: [this.selSala.salaLotacao, Validators.compose([Validators.required])],
                salaAtiva: [this.selSala.salaAtiva],
                salaDtCadastro: [this.selSala.salaDtCadastro]
            });

        } else {
            this.formAddSala = this.formBuilder.group({
                salaId: [0],
                salaNome: [null, Validators.compose([Validators.required])],
                salaLotacao: [null, Validators.compose([Validators.required])],
                salaAtiva: [true],
                salaDtCadastro: [new Date()]
            });
        }

        this.selUnidade = new FormControl(
            this.selSala != null ? this.selSala.salaUnidade.uniId : this.localUser.pessoa.pesUnidade.uniId
        );
    }

    adicionarSala() {

        const sala = this.montarSala();

        let retorno: Sala;
        this.salaService.adicionar(sala).subscribe(ret => {
            retorno = ret.data;
        });

        if (retorno) {
            if (this.selSala != null) {
                alert(`Sala ${retorno.salaNome} Atualizada com Sucesso!`);

            } else {
                alert(`Sala ${retorno.salaNome} Adicionada com Sucesso!`);
            }

            this.router.navigate(['/salas']);
        }
    }

    montarSala(): Sala {

        let salaPesCadastro = this.selSala == null ? this.localUser.pessoa.pesId : null;

        return {
            salaId: this.formAddSala.value.salaId,
            salaNome: this.formAddSala.value.salaNome,
            salaLotacao: this.formAddSala.value.salaLotacao,
            salaAtiva: this.formAddSala.value.salaAtiva,
            salaPesAtualizacao: this.localUser.pessoa.pesId,
            salaDtAtualizacao: new Date(),
            salaUnidade: montarUnidadeComId(this.selUnidade.value),
            salaPesCadastro: salaPesCadastro,
            salaDtCadastro: new Date(),
        };
    }

    excluir() {
        let retorno: boolean;
        this.salaService.deletar(this.selSala.salaId).subscribe(ret => {
            retorno = ret.data;
        });

        if (retorno) {
            alert(`${this.selSala.salaNome} Deletada com Sucesso!`);
            this.router.navigate(['/salas']);

        } else {
            alert(`Não foi possível Deletar ${this.selSala.salaNome}!`);
        }
    }
}
