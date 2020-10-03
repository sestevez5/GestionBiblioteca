import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaLectoresComponent } from './lista-lectores.component';

describe('ListaLectoresComponent', () => {
  let component: ListaLectoresComponent;
  let fixture: ComponentFixture<ListaLectoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaLectoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaLectoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
