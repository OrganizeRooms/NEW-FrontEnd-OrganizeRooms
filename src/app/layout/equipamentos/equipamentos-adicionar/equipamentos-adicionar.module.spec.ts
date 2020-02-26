import { EquipamentosAdicionarModule } from './equipamentos-adicionar.module';

describe('EquipamentosAdicionarModule', () => {
  let equipamentosAdicionarModule: EquipamentosAdicionarModule;

  beforeEach(() => {
    equipamentosAdicionarModule = new EquipamentosAdicionarModule();
  });

  it('should create an instance', () => {
    expect(equipamentosAdicionarModule).toBeTruthy();
  });
});
