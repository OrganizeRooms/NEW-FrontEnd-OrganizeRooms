import { PessoasImportarModule } from './pessoas-importar.module';

describe('PessoasImportarModule', () => {
  let pessoasImportarModule: PessoasImportarModule;

  beforeEach(() => {
    pessoasImportarModule = new PessoasImportarModule();
  });

  it('should create an instance', () => {
    expect(pessoasImportarModule).toBeTruthy();
  });
});
