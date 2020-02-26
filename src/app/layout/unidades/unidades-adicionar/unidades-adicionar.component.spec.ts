import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UnidadesAdicionarComponent } from './unidades-adicionar.component';
import { UnidadesAdicionarModule } from './unidades-adicionar.module';

describe('UnidadesAdicionarComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ UnidadesAdicionarModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(UnidadesAdicionarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
