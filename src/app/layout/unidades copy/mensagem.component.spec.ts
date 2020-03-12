import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MensagemComponent } from './mensagem.component';
import { MensagemModule } from './mensagem.module';

describe('MensagemComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MensagemModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(MensagemComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
