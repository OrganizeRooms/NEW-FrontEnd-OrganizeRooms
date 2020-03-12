import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OrganizeRoomsService, SessionStorageService, UnidadeService, EquipamentoService } from 'src/app/shared/_services';
import { Equipamento, Unidade, LocalUser, montarUnidadeComId } from 'src/app/shared/_models';

@Component({
    selector: 'app-equipamentos-adicionar',
    templateUrl: './equipamentos-adicionar.component.html',
    styleUrls: ['./equipamentos-adicionar.component.scss'],
    animations: [routerTransition()]
})

export class EquipamentosAdicionarComponent implements OnInit, OnDestroy {

    labelPosition = 'before';
    localUser: LocalUser;
    permissao: string;
    formAddEquipamento: FormGroup;
    listUnidades: Unidade[];
    selEquipamento: Equipamento;
    selUnidade = new FormControl();

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private organizeRoomsService: OrganizeRoomsService<Equipamento>,
        private sessionStorageService: SessionStorageService,
        private unidadeService: UnidadeService,
        private equipamentoService: EquipamentoService
    ) { }

    ngOnInit() {
        this.selEquipamento = this.organizeRoomsService.getValue();
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
        if (this.selEquipamento != null) {
            this.formAddEquipamento = this.formBuilder.group({
                equId: [this.selEquipamento.equId],
                equNome: [this.selEquipamento.equNome, Validators.compose([Validators.required])],
                equDescricao: [this.selEquipamento.equDescricao, Validators.compose([Validators.required])],
                equAtiva: [this.selEquipamento.equAtiva],
                equDtCadastro: [this.selEquipamento.equDtCadastro]
            });

        } else {
            this.formAddEquipamento = this.formBuilder.group({
                equId: [0],
                equNome: [null, Validators.compose([Validators.required])],
                equDescricao: [null, Validators.compose([Validators.required])],
                equAtiva: [true],
                equDtCadastro: [new Date()]
            });
        }

        this.selUnidade = new FormControl(
            this.selUnidade != null ? this.selEquipamento.equUnidade.uniId : this.localUser.pessoa.pesUnidade.uniId
        );
    }

    adicionarEquipamento() {

        let retorno: Equipamento;
        this.equipamentoService.adicionar(this.montarEquipamento()).subscribe(ret => {
            retorno = ret.data;
        });

        if (retorno) {
            if (this.selEquipamento != null) {
                alert(`Equipamento ${retorno.equNome} Atualizada com Sucesso!`);
            } else {
                alert(`Equipamento ${retorno.equNome} Adicionada com Sucesso!`);

            }
            this.router.navigate(['/equipamentos']);
        }
    }

    montarEquipamento(): Equipamento {

        return {
            equId: this.formAddEquipamento.value.equId,
            equNome: this.formAddEquipamento.value.equNome,
            equDescricao: this.formAddEquipamento.value.equDescricao,
            equAtiva: this.formAddEquipamento.value.equAtiva,
            equUnidade: montarUnidadeComId(this.selUnidade.value),
            equPesAtualizacao: this.localUser.pessoa.pesId,
            equDtAtualizacao: new Date(),
            equPesCadastro: this.selEquipamento == null ? this.localUser.pessoa.pesId : null,
            equDtCadastro: new Date(),
        };
    }

    excluir() {

        let retorno: boolean;
        this.equipamentoService.deletar(this.selEquipamento.equId).subscribe(ret => {
            retorno = ret.data;
        });

        if (retorno) {
            alert(`Equipamento ${this.selEquipamento.equNome} Deletada com Sucesso!`);
            location.reload()
        } else {
            alert(`Não foi possível Deletar a Equipamento ${this.selEquipamento.equNome}!`);
        }
    }
}
