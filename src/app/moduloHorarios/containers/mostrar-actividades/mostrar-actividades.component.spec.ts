import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarActividadesComponent } from './mostrar-actividades.component';

describe('MostrarActividadesComponent', () => {
  let component: MostrarActividadesComponent;
  let fixture: ComponentFixture<MostrarActividadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarActividadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
