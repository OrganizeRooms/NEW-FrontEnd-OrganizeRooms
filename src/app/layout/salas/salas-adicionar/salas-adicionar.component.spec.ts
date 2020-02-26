import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SalasAdicionarComponent } from './salas-adicionar.component';
import { SalasAdicionarModule } from './salas-adicionar.module';

describe('SalasAdicionarComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SalasAdicionarModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(SalasAdicionarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
