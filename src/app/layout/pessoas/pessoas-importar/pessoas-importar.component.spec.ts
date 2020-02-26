import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PessoasImportarComponent } from './pessoas-importar.component';
import { PessoasImportarModule } from './pessoas-importar.module';

describe('PessoasImportarComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ PessoasImportarModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(PessoasImportarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
