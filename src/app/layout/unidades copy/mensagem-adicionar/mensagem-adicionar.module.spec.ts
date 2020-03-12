import { MensagemAdicionarModule } from './mensagem-adicionar.module';

describe('MensagemAdicionarModule', () => {
  let mensagemAdicionarModule: MensagemAdicionarModule;

  beforeEach(() => {
    mensagemAdicionarModule = new MensagemAdicionarModule();
  });

  it('should create an instance', () => {
    expect(mensagemAdicionarModule).toBeTruthy();
  });
});
