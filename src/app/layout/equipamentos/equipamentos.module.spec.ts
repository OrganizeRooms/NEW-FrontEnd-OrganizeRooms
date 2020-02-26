import { EquipamentosModule } from './equipamentos.module';

describe('EquipamentosModule', () => {
  let equipamentosModule: EquipamentosModule;

  beforeEach(() => {
    equipamentosModule = new EquipamentosModule();
  });

  it('should create an instance', () => {
    expect(equipamentosModule).toBeTruthy();
  });
});
