import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SalasComponent } from './salas.component';
import { SalasModule } from './salas.module';

describe('SalasComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SalasModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(SalasComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
