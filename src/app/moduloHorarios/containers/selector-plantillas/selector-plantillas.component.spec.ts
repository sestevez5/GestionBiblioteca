import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorPlantillasComponent } from './selector-plantillas.component';

describe('SelectorPlantillasComponent', () => {
  let component: SelectorPlantillasComponent;
  let fixture: ComponentFixture<SelectorPlantillasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorPlantillasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorPlantillasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
