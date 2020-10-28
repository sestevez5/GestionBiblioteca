import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtenerImagenComponent } from './obtener-imagen.component';

describe('ObtenerImagenComponent', () => {
  let component: ObtenerImagenComponent;
  let fixture: ComponentFixture<ObtenerImagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObtenerImagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObtenerImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
