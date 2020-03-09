import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarDisponibilidadeComponent } from './verificar-disponibilidade.component';

describe('VerificarDisponibilidadeComponent', () => {
  let component: VerificarDisponibilidadeComponent;
  let fixture: ComponentFixture<VerificarDisponibilidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificarDisponibilidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificarDisponibilidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
