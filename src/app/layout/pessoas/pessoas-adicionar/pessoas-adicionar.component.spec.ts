import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PessoasAdicionarComponent } from './pessoas-adicionar.component';
import { PessoasAdicionarModule } from './pessoas-adicionar.module';

describe('PessoasAdicionarComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ PessoasAdicionarModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(PessoasAdicionarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
