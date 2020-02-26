import { PessoasAdicionarModule } from './pessoas-adicionar.module';

describe('PessoasAdicionarModule', () => {
  let pessoasAdicionarModule: PessoasAdicionarModule;

  beforeEach(() => {
    pessoasAdicionarModule = new PessoasAdicionarModule();
  });

  it('should create an instance', () => {
    expect(pessoasAdicionarModule).toBeTruthy();
  });
});
