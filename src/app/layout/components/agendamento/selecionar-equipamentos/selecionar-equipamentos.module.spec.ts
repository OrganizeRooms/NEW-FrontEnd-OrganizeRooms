import { SelecionarEquipamentosModule } from './selecionar-equipamentos.module';

describe('SelecionarEquipamentosModule', () => {
  let selecionarEquipamentosModule: SelecionarEquipamentosModule;

  beforeEach(() => {
    selecionarEquipamentosModule = new SelecionarEquipamentosModule();
  });

  it('should create an instance', () => {
    expect(selecionarEquipamentosModule).toBeTruthy();
  });
});
