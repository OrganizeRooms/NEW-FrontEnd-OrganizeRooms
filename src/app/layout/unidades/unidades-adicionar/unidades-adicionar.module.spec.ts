import { UnidadesAdicionarModule } from './unidades-adicionar.module';
import { TestBed } from '@angular/core/testing';

describe('UnidadesAdicionarModule', () => {
  let unidadesAdicionarModule: UnidadesAdicionarModule;

  beforeEach(() => {
    unidadesAdicionarModule = new UnidadesAdicionarModule();
  });

  it('should create an instance', () => {
    expect(unidadesAdicionarModule).toBeTruthy();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
});
});
