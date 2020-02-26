import { LayoutTabletModule } from './layout-tablet.module';

describe('LayoutModule', () => {
    let layoutTabletModule: LayoutTabletModule;

    beforeEach(() => {
        layoutTabletModule = new LayoutTabletModule();
    });

    it('should create an instance', () => {
        expect(layoutTabletModule).toBeTruthy();
    });
});
