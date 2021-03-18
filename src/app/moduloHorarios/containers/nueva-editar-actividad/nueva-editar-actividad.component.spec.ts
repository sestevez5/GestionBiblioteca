import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaEditarActividadComponent } from './nueva-editar-actividad.component';

describe('NuevaEditarActividadComponent', () => {
  let component: NuevaEditarActividadComponent;
  let fixture: ComponentFixture<NuevaEditarActividadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaEditarActividadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaEditarActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
