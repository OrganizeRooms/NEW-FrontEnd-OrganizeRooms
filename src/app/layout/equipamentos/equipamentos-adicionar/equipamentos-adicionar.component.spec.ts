import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EquipamentosAdicionarComponent } from './equipamentos-adicionar.component';
import { EquipamentosAdicionarModule } from './equipamentos-adicionar.module';

describe('EquipamentosAdicionarComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ EquipamentosAdicionarModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(EquipamentosAdicionarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
