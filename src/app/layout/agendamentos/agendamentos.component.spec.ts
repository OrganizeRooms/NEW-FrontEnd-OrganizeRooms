import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AgendamentosComponent } from './agendamentos.component';
import { AgendamentosModule } from './agendamentos.module';

describe('AgendamentosComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AgendamentosModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(AgendamentosComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
