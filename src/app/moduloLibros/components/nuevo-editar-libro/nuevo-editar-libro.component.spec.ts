import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoEditarLibroComponent } from './nuevo-editar-libro.component';

describe('NuevoEditarLibroComponent', () => {
  let component: NuevoEditarLibroComponent;
  let fixture: ComponentFixture<NuevoEditarLibroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoEditarLibroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoEditarLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
