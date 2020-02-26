import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ReservarComponent } from './reservar.component';
import { ReservarModule } from './reservar.module';

describe('ReservarComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReservarModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(ReservarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
