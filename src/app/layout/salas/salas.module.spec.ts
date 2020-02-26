import { SalasModule } from './salas.module';

describe('SalasModule', () => {
  let salasModule: SalasModule;

  beforeEach(() => {
    salasModule = new SalasModule();
  });

  it('should create an instance', () => {
    expect(salasModule).toBeTruthy();
  });
});
