import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UnidadesComponent } from './unidades.component';
import { UnidadesModule } from './unidades.module';

describe('UnidadesComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ UnidadesModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(UnidadesComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
