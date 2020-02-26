import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeTabletComponent } from './home-tablet.component';
import { HomeTabletModule } from './home-tablet.module';

describe('HomeTabletComponent', () => {
  let component: HomeTabletComponent;
  let fixture: ComponentFixture<HomeTabletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HomeTabletModule,
        RouterTestingModule,
        BrowserAnimationsModule,
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTabletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
