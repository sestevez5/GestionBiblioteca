import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarActividadComponent } from './mostrar-actividad.component';

describe('MostrarActividadComponent', () => {
  let component: MostrarActividadComponent;
  let fixture: ComponentFixture<MostrarActividadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarActividadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
