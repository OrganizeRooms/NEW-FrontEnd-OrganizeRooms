import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Pessoa, Unidade, LocalUser } from 'src/app/shared/_models';
import { OrganizeRoomsService, SessionStorageService } from 'src/app/shared/_services';
import { PessoaController, UnidadeController } from 'src/app/shared/_controllers';

@Component({
    selector: 'app-pessoas-adicionar',
    templateUrl: './pessoas-adicionar.component.html',
    styleUrls: ['./pessoas-adicionar.component.scss'],
    animations: [routerTransition()]
})

export class PessoasAdicionarComponent implements OnInit, OnDestroy {

    labelPosition = 'before';
    permissao: string;
    localUser: LocalUser;
    formAddPessoa: FormGroup;
    listUnidades: Unidade[];
    selPessoa: Pessoa;
    selUnidade = new FormControl();
    selPermissao: string;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private organizeRoomsService: OrganizeRoomsService<Pessoa>,
        private sessionStorageService: SessionStorageService,
        private pessoaController: PessoaController,
        private unidadeController: UnidadeController
    ) { }

    ngOnInit() {
        this.selPessoa = this.organizeRoomsService.getValue();
        this.localUser = this.sessionStorageService.getValue();
        this.permissao = this.localUser.pessoa.pesPermissao;

        this.carregarUnidades();
        this.criarFormulario();
    }

    ngOnDestroy() {
        this.organizeRoomsService.setValue(null)
    }

    async carregarUnidades() {
        this.listUnidades = await this.unidadeController.buscarAtivas();
    }

    criarFormulario() {
        if (this.selPessoa != null) {
            this.formAddPessoa = this.formBuilder.group({
                pesId: [this.selPessoa.pesId],
                pesNome: [this.selPessoa.pesNome, Validators.compose([Validators.required])],
                pesEmail: [this.selPessoa.pesEmail, Validators.compose([Validators.required])],
                // pesPermissao: [this.selPessoa.pesPermissao],
                pesDDD: [this.selPessoa.pesDdd],
                pesTelefone: [this.selPessoa.pesTelefone],
                pesTipoInclusao: [this.selPessoa.pesTipoInclusao],
                pesDtCadastro: [this.selPessoa.pesDtCadastro],
            });

        } else {
            this.formAddPessoa = this.formBuilder.group({
                pesId: [0],
                pesNome: [null, Validators.compose([Validators.required])],
                pesEmail: [null, Validators.compose([Validators.required])],
                // pesPermissao: [null],
                pesDDD: [null],
                pesTelefone: [null],
                pesTipoInclusao: ['SIS'],
                pesDtCadastro: [new Date()],
            });
        }

        this.selPermissao = this.selPessoa == null ? 'ROLE_USUARIO' : this.selPessoa.pesPermissao;
        this.selUnidade = new FormControl(
            this.selPessoa == null ? this.localUser.pessoa.pesUnidade.uniId : this.selPessoa.pesUnidade.uniId
        )
    }

    async adicionarPessoa() {

        const pessoa = this.montarPessoa();

        let retPessoa = await this.pessoaController.adicionar(pessoa);
        if (retPessoa != null) {
            if (this.selPessoa != null) {
                alert(`Pessoa ${retPessoa.pesNome} Atualizada com Sucesso!`);
            } else {
                alert(`Pessoa ${retPessoa.pesNome} Adiconada com Sucesso!`);
            }

            this.router.navigate(['/pessoas']);
        } else {
            alert('Não foi possível realizar a ação! Tente Novamente.');
        }
    }

    montarPessoa(): Pessoa {

        var pesTipoInclusao = this.selPessoa == null ? 'SIS' : null;
        var pesCadastro = this.selPessoa == null ? this.localUser.pessoa.pesId : null;

        return {
            pesId: this.formAddPessoa.value.pesId,
            pesNome: this.formAddPessoa.value.pesNome,
            pesEmail: this.formAddPessoa.value.pesEmail,
            pesPermissao: this.selPermissao,
            pesDescricaoPermissao: null,
            pesUnidade: this.unidadeController.montarUnidadeComId(this.selUnidade.value),
            pesDdd: this.formAddPessoa.value.pesDDD,
            pesTelefone: this.formAddPessoa.value.pesTelefone,
            pesAtualizacao: this.localUser.pessoa.pesId,
            pesDtAtualizacao: new Date(),
            pesCadastro: pesCadastro,
            pesTipoInclusao: pesTipoInclusao,
            pesDtCadastro: new Date(),
            participanteObrigatorio: null,
        };
    }

    async excluir() {

        let retorno = await this.pessoaController.deletar(this.selPessoa.pesId);
        if (retorno == true) {
            alert(`Pessoa ${this.selPessoa.pesNome} Deletada com Sucesso!`);
            this.router.navigate(['/pessoas']);

        } else {

            alert(`Não foi possível Deletar a Pessoa ${this.selPessoa.pesNome} !`);
        }
    }

    async resetarSenha() {

        let retorno = await this.pessoaController.resetarSenha(this.selPessoa);

        if (retorno) {
            alert("Senha Resetada com Sucesso!")
        } else {
            alert("Erro ao Resetar Senha!")
        }
    }
}
