import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarReglasNegocioComponent } from './mostrar-reglas-negocio.component';

describe('MostrarReglasNegocioComponent', () => {
  let component: MostrarReglasNegocioComponent;
  let fixture: ComponentFixture<MostrarReglasNegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarReglasNegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarReglasNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
