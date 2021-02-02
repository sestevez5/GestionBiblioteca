import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelHorarioComponent } from './panel-horario.component';

describe('PanelHorarioComponent', () => {
  let component: PanelHorarioComponent;
  let fixture: ComponentFixture<PanelHorarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelHorarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
