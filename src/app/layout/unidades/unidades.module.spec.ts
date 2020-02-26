import { UnidadesModule } from './unidades.module';

describe('UnidadesModule', () => {
  let unidadesModule: UnidadesModule;

  beforeEach(() => {
    unidadesModule = new UnidadesModule();
  });

  it('should create an instance', () => {
    expect(unidadesModule).toBeTruthy();
  });
});
