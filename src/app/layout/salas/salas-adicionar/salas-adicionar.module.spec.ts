import { SalasAdicionarModule } from './salas-adicionar.module';

describe('SalasAdicionarModule', () => {
  let salasAdicionarModule: SalasAdicionarModule;

  beforeEach(() => {
    salasAdicionarModule = new SalasAdicionarModule();
  });

  it('should create an instance', () => {
    expect(salasAdicionarModule).toBeTruthy();
  });
});
