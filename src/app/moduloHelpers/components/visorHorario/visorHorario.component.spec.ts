import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorHorarioComponent } from './visorHorario.component';

describe('HorarioComponent', () => {
  let component: VisorHorarioComponent;
  let fixture: ComponentFixture<VisorHorarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisorHorarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisorHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
