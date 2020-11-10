import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarImagenComponent } from './cargar-imagen-fichero.component';

describe('CargarImagenComponent', () => {
  let component: CargarImagenComponent;
  let fixture: ComponentFixture<CargarImagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarImagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
