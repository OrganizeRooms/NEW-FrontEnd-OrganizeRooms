import { AgendamentosDetalhesModule } from './agendamentos-detalhes.module';

describe('AgendamentosDetalhesModule', () => {
  let agendamentosDetalhesModule: AgendamentosDetalhesModule;

  beforeEach(() => {
    agendamentosDetalhesModule = new AgendamentosDetalhesModule();
  });

  it('should create an instance', () => {
    expect(agendamentosDetalhesModule).toBeTruthy();
  });
});
