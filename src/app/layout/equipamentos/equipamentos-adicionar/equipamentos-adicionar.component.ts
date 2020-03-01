import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    EquipamentoService, UnidadeService, OrganizeRoomsService, Equipamento, SessionStorageService, Unidade
} from 'src/app/shared';
import { Router } from '@angular/router';

@Component({
    selector: 'app-equipamentos-adicionar',
    templateUrl: './equipamentos-adicionar.component.html',
    styleUrls: ['./equipamentos-adicionar.component.scss'],
    animations: [routerTransition()]
})

export class EquipamentosAdicionarComponent implements OnInit, OnDestroy {
    labelPosition = 'before';
    permissao;

    formAddEquipamento: FormGroup;
    listUnidades;

    selEquipamento;
    selUnidade = new FormControl();

    equDtAtualizacao;
    equPesAtualizacao;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private equipamentoService: EquipamentoService,
        private unidadeService: UnidadeService,
        private organizeRoomsService: OrganizeRoomsService,
        
    ) { }

    ngOnInit() {
        this.selEquipamento = this.organizeRoomsService.getValue();

        /*if (this.selEquipamento != null && this.selEquipamento.equPesAtualizacao != null) {
            this.equPesAtualizacao = this.selEquipamento.equPesAtualizacao.pesNome;
            this.equDtAtualizacao = this.selEquipamento.equDtAtualizacao;
        }*/

        this.carregarUnidades();
        this.criarFormulario();

        this.permissao = SessionStorageService.getSessionUser().pessoa.pesPermissao;
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
            this.selUnidade = new FormControl(this.selEquipamento.equUnidade.uniId)

        } else {
            this.formAddEquipamento = this.formBuilder.group({
                equId: [0],
                equNome: [null, Validators.compose([Validators.required])],
                equDescricao: [null, Validators.compose([Validators.required])],
                equAtiva: [true],
                equDtCadastro: [new Date()]
            });
            this.selUnidade = new FormControl(SessionStorageService.getSessionUser().pessoa.pesUnidade.uniId)
        }
    }

    adicionarEquipamento() {

        var equPesCadastro;
        if (this.selEquipamento != null) {
            equPesCadastro = null
        } else {
            equPesCadastro = SessionStorageService.getSessionUser().pessoa.pesId
        }

        const unidade: Unidade = {
            uniId: this.selUnidade.value,
            uniNome: null,
            uniAtiva: null,
            uniPesCadastro: null,
            uniDtCadastro: null,
            uniPesAtualizacao: null,
            uniDtAtualizacao: null
        }

        const equipamento: Equipamento = {
            equId: this.formAddEquipamento.value.equId,
            equNome: this.formAddEquipamento.value.equNome,
            equDescricao: this.formAddEquipamento.value.equDescricao,
            equAtiva: this.formAddEquipamento.value.equAtiva,
            equUnidade: unidade,
            equPesAtualizacao: SessionStorageService.getSessionUser().pessoa.pesId,
            equDtAtualizacao: new Date(),
            // NÃO É ATUALIZADO 
            equPesCadastro: equPesCadastro,
            equDtCadastro: null,
        };

        this.equipamentoService.adicionar(equipamento).subscribe(ret => {
            if (ret.data != null) {
                if (this.selEquipamento != null) {
                    alert('Equipamento ' + ret.data.equNome + ' Atualizada com Sucesso!');
                    this.router.navigate(['/equipamentos']);
                } else {
                    alert('Equipamento ' + ret.data.equNome + ' Adicionada com Sucesso!');
                    this.router.navigate(['/equipamentos']);
                }
            }
        });
    }

    excluir() {
        this.equipamentoService.deletar(this.selEquipamento.equId).subscribe(ret => {
            if (ret.data == true) {
                alert('Equipamento ' + this.selEquipamento.equNome + ' Deletada com Sucesso!');
                this.router.navigate(['/equipamentos']);
            }
            if (ret.data == false) {
                alert('Não foi possível Deletar a Equipamento ' + this.selEquipamento.equNome + ' !');
            }
        })
    }
}
