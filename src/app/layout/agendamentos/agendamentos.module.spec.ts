import { AgendamentosModule } from './agendamentos.module';

describe('AgendamentosModule', () => {
  let agendamentosModule: AgendamentosModule;

  beforeEach(() => {
    agendamentosModule = new AgendamentosModule();
  });

  it('should create an instance', () => {
    expect(agendamentosModule).toBeTruthy();
  });
});
