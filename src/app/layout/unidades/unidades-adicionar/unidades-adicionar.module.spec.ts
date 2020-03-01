import { UnidadesAdicionarModule } from './unidades-adicionar.module';

describe('UnidadesAdicionarModule', () => {
  let unidadesAdicionarModule: UnidadesAdicionarModule;

  beforeEach(() => {
    unidadesAdicionarModule = new UnidadesAdicionarModule();
  });

  it('should create an instance', () => {
    expect(unidadesAdicionarModule).toBeTruthy();
  });
});
