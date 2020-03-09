import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SelecionarEquipamentosComponent } from './selecionar-equipamentos.component';
import { SelecionarEquipamentosModule } from './selecionar-equipamentos.module';

describe('SelecionarEquipamentosComponent', () => {
  let component: SelecionarEquipamentosComponent;
  let fixture: ComponentFixture<SelecionarEquipamentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SelecionarEquipamentosModule, RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecionarEquipamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
