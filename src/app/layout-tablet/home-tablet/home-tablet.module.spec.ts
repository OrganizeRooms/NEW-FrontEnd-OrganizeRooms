import { HomeTabletModule } from './home-tablet.module';

describe('HomeModule', () => {
  let homeTabletModule: HomeTabletModule;

  beforeEach(() => {
    homeTabletModule = new HomeTabletModule();
  });

  it('should create an instance', () => {
    expect(homeTabletModule).toBeTruthy();
  });
});
