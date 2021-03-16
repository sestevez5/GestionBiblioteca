import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorSemanasComponent } from './selector-semanas.component';

describe('SelectorSemanasComponent', () => {
  let component: SelectorSemanasComponent;
  let fixture: ComponentFixture<SelectorSemanasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorSemanasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorSemanasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
