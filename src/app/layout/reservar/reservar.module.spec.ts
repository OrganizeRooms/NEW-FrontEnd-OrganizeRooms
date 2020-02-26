import { ReservarModule } from './reservar.module';

describe('ReservarModule', () => {
  let reservarModule: ReservarModule;

  beforeEach(() => {
    reservarModule = new ReservarModule();
  });

  it('should create an instance', () => {
    expect(reservarModule).toBeTruthy();
  });
});
