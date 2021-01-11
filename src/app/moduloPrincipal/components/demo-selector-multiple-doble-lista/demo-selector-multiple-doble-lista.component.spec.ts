import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoSelectorMultipleDobleListaComponent } from './demo-selector-multiple-doble-lista.component';

describe('DemoSelectorMultipleDobleListaComponent', () => {
  let component: DemoSelectorMultipleDobleListaComponent;
  let fixture: ComponentFixture<DemoSelectorMultipleDobleListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoSelectorMultipleDobleListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoSelectorMultipleDobleListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
