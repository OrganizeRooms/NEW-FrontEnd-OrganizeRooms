import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LayoutTabletComponent } from './layout-tablet.component';
import { LayoutTabletModule } from './layout-tablet.module';

describe('LayoutTabletComponent', () => {
  let component: LayoutTabletComponent;
  let fixture: ComponentFixture<LayoutTabletComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          LayoutTabletModule,
          RouterTestingModule,
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutTabletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
