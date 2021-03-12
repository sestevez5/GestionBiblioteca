import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabeceraEntidadHorarioComponent } from './cabecera-entidad-horario.component';

describe('CabeceraEntidadHorarioComponent', () => {
  let component: CabeceraEntidadHorarioComponent;
  let fixture: ComponentFixture<CabeceraEntidadHorarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabeceraEntidadHorarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabeceraEntidadHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
