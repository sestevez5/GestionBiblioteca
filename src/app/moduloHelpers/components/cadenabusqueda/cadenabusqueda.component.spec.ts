import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadenabusquedaComponent } from './cadenabusqueda.component';

describe('CadenabusquedaComponent', () => {
  let component: CadenabusquedaComponent;
  let fixture: ComponentFixture<CadenabusquedaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadenabusquedaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadenabusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
