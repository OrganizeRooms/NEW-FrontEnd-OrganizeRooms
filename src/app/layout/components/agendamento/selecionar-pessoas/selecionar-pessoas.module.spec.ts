import { SelecionarPessoasModule } from './selecionar-pessoas.module';

describe('SelecionarPessoasModule', () => {
  let selecionarPessoasModule: SelecionarPessoasModule;

  beforeEach(() => {
    selecionarPessoasModule = new SelecionarPessoasModule();
  });

  it('should create an instance', () => {
    expect(selecionarPessoasModule).toBeTruthy();
  });
});
