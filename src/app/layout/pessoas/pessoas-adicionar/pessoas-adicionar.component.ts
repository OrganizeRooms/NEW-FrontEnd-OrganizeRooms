import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PessoaService, OrganizeRoomsService, UnidadeService, Pessoa, SessionStorageService, Unidade } from 'src/app/shared';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pessoas-adicionar',
    templateUrl: './pessoas-adicionar.component.html',
    styleUrls: ['./pessoas-adicionar.component.scss'],
    animations: [routerTransition()]
})

export class PessoasAdicionarComponent implements OnInit, OnDestroy {
    labelPosition = 'before';
    permissao;

    formAddPessoa: FormGroup;
    listUnidades;

    selPessoa;
    selUnidade = new FormControl();
    selPermissao;

    pesDtAtualizacao;
    pesAtualizacao;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private PessoaService: PessoaService,
        private unidadeService: UnidadeService,
        private organizeRoomsService: OrganizeRoomsService,
        
    ) { }

    ngOnInit() {
        this.selPessoa = this.organizeRoomsService.getValue();
        this.carregarUnidades();
        this.criarFormulario();
        this.permissao = SessionStorageService.getSessionUser().pessoa.pesPermissao;
    }

    ngOnDestroy() {
        this.organizeRoomsService.setValue(null)
    }

    carregarUnidades() {
        this.unidadeService.buscarUnidadesAtivas().subscribe(ret => {
            this.listUnidades = ret.data;
        });
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
            this.selPermissao = this.selPessoa.pesPermissao
            this.selUnidade = new FormControl(this.selPessoa.pesUnidade.uniId)
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
            this.selUnidade = new FormControl(SessionStorageService.getSessionUser().pessoa.pesUnidade.uniId)
            this.selPermissao = 'ROLE_USUARIO';
        }
    }

    adicionarPessoa() {

        var pesTipoInclusao;
        var pesCadastro;
        if (this.selPessoa != null) {
            pesTipoInclusao = null
            pesCadastro = null
        } else {
            pesCadastro = SessionStorageService.getSessionUser().pessoa.pesId
            pesTipoInclusao = 'SIS'
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

        const pessoa: Pessoa = {
            pesId: this.formAddPessoa.value.pesId,
            pesNome: this.formAddPessoa.value.pesNome,
            pesEmail: this.formAddPessoa.value.pesEmail,
            pesPermissao: this.selPermissao,
            pesDescricaoPermissao: null,
            pesUnidade: unidade,
            pesDdd: this.formAddPessoa.value.pesDDD,
            pesTelefone: this.formAddPessoa.value.pesTelefone,
            pesAtualizacao: SessionStorageService.getSessionUser().pessoa.pesId,
            pesDtAtualizacao: new Date(),
            // NÃO É ATUALIZADO 
            pesCadastro: pesCadastro,
            pesTipoInclusao: pesTipoInclusao,
            pesDtCadastro: null,

            // somente front
            participanteObrigatorio: null,
        };
        this.PessoaService.adicionarAtualizarPessoa(pessoa).subscribe(ret => {
            if (ret.data != null) {
                if (this.selPessoa != null) {
                    alert('Pessoa ' + ret.data.pesNome + ' Atualizada com Sucesso!');
                    this.router.navigate(['/pessoas']);
                } else {
                    alert('Pessoa ' + ret.data.pesNome + ' Adiconada com Sucesso!');
                    this.router.navigate(['/pessoas']);
                }
            }
        });
    }

    excluir() {
        this.PessoaService.deletar(this.selPessoa.pesId).subscribe(ret => {
            if (ret.data == true) {
                alert('Pessoa ' + this.selPessoa.pesNome + ' Deletada com Sucesso!');
                this.router.navigate(['/pessoas']);
            }
            if (ret.data == false) {
                alert('Não foi possível Deletar a Pessoa ' + this.selPessoa.pesNome + ' !');
            }
        })
    }

    resetarSenha() {
        this.PessoaService.resetarSenha(this.selPessoa).subscribe(ret => {
            if (ret.data != 'false') {
                alert("Senha Resetada com Sucesso!")
            } else {
                alert("Erro ao Resetar Senha!")
            }
        });

    }
}
