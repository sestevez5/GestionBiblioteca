import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorEntidadesComponent } from './selector-entidades.component';

describe('SelectorEntidadesComponent', () => {
  let component: SelectorEntidadesComponent;
  let fixture: ComponentFixture<SelectorEntidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorEntidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorEntidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
