import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PessoasComponent } from './pessoas.component';
import { PessoasModule } from './pessoas.module';

describe('PessoasComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ PessoasModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(PessoasComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
