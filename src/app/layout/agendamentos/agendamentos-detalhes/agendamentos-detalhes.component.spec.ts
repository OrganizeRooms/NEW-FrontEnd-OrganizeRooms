import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AgendamentosDetalhesComponent } from './agendamentos-detalhes.component';
import { AgendamentosDetalhesModule } from './agendamentos-detalhes.module';

describe('AgendamentosDetalhesComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AgendamentosDetalhesModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(AgendamentosDetalhesComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
