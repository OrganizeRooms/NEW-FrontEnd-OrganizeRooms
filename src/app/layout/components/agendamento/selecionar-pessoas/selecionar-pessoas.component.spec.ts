import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SelecionarPessoasComponent } from './selecionar-pessoas.component';
import { SelecionarPessoasModule } from './selecionar-pessoas.module';

describe('SelecionarPessoasComponent', () => {
  let component: SelecionarPessoasComponent;
  let fixture: ComponentFixture<SelecionarPessoasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SelecionarPessoasModule, RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecionarPessoasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
