import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sala, OrganizeRoomsService, SalaService, UnidadeService, SessionStorageService, Unidade } from 'src/app/shared';
import { Router } from '@angular/router';

@Component({
    selector: 'app-salas-adicionar',
    templateUrl: './salas-adicionar.component.html',
    styleUrls: ['./salas-adicionar.component.scss'],
    animations: [routerTransition()],
})

export class SalasAdicionarComponent implements OnInit, OnDestroy {
    labelPosition = 'before';
    permissao;

    formAddSala: FormGroup;
    listUnidades;

    selSala;
    selUnidade = new FormControl();

    salaDtAtualizacao;
    salaPesAtualizacao;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private salaService: SalaService,
        private unidadeService: UnidadeService,
        private organizeRoomsService: OrganizeRoomsService<Sala>,
        
    ) { }

    ngOnInit() {
        this.selSala = this.organizeRoomsService.getValue();

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
        if (this.selSala != null) {
            this.formAddSala = this.formBuilder.group({
                salaId: [this.selSala.salaId],
                salaNome: [this.selSala.salaNome, Validators.compose([Validators.required])],
                salaLotacao: [this.selSala.salaLotacao, Validators.compose([Validators.required])],
                salaAtiva: [this.selSala.salaAtiva],
                salaDtCadastro: [this.selSala.salaDtCadastro]
            });
            this.selUnidade = new FormControl(this.selSala.salaUnidade.uniId)
        } else {
            this.formAddSala = this.formBuilder.group({
                salaId: [0],
                salaNome: [null, Validators.compose([Validators.required])],
                salaLotacao: [null, Validators.compose([Validators.required])],
                salaAtiva: [true],
                salaDtCadastro: [new Date()]
            });
            this.selUnidade = new FormControl(SessionStorageService.getSessionUser().pessoa.pesUnidade.uniId);
        }
    }

    adicionarSala() {

        var salaPesCadastro;
        if (this.selSala != null) {
            salaPesCadastro = null
        } else {
            salaPesCadastro = SessionStorageService.getSessionUser().pessoa.pesId
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

        const sala: Sala = {
            salaId: this.formAddSala.value.salaId,
            salaNome: this.formAddSala.value.salaNome,
            salaLotacao: this.formAddSala.value.salaLotacao,
            salaAtiva: this.formAddSala.value.salaAtiva,
            salaPesAtualizacao: SessionStorageService.getSessionUser().pessoa.pesId,
            salaDtAtualizacao: new Date(),
            salaUnidade: unidade,
            salaPesCadastro: salaPesCadastro,
            // NÃO É ATUALIZADO 
            salaDtCadastro: null,
        };

        this.salaService.adicionar(sala).subscribe(ret => {
            if (ret.data != null) {
                if (this.selSala != null) {
                    alert('Sala ' + ret.data.salaNome + ' Atualizada com Sucesso!');
                    this.router.navigate(['/salas']);
                } else {
                    alert('Sala ' + ret.data.salaNome + ' Adicionada com Sucesso!');
                    this.router.navigate(['/salas']);
                }
            }
        });
    }

    excluir() {
        this.salaService.deletar(this.selSala.salaId).subscribe(ret => {
            if (ret.data == true) {
                alert(this.selSala.salaNome + ' Deletada com Sucesso!');
                this.router.navigate(['/salas']);
            }
            if (ret.data == false) {
                alert('Não foi possível Deletar ' + this.selSala.salaNome + ' !');
            }
        })
    }
}
