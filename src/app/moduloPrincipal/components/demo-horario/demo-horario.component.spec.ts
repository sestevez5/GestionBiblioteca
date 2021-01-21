import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoHorarioComponent } from './demo-horario.component';

describe('DemoHorarioComponent', () => {
  let component: DemoHorarioComponent;
  let fixture: ComponentFixture<DemoHorarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoHorarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
