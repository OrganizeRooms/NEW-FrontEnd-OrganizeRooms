import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EquipamentosComponent } from './equipamentos.component';
import { EquipamentosModule } from './equipamentos.module';

describe('EquipamentosComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ EquipamentosModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(EquipamentosComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
