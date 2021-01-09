import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { listaUsuariosComponent } from './lista-usuarios.component';

describe('ListausuariosComponent', () => {
  let component: listaUsuariosComponent;
  let fixture: ComponentFixture<listaUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ listaUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(listaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
