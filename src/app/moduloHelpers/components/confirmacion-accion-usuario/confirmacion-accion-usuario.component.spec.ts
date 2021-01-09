import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionAccionUsuarioComponent } from './confirmacion-accion-usuario.component';

describe('ConfirmacionAccionUsuarioComponent', () => {
  let component: ConfirmacionAccionUsuarioComponent;
  let fixture: ComponentFixture<ConfirmacionAccionUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmacionAccionUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionAccionUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
