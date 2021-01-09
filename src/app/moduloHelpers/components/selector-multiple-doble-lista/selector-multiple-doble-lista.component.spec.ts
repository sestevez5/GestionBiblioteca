import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorMultipleDobleListaComponent } from './selector-multiple-doble-lista.component';

describe('SelectorMultipleDobleListaComponent', () => {
  let component: SelectorMultipleDobleListaComponent;
  let fixture: ComponentFixture<SelectorMultipleDobleListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorMultipleDobleListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorMultipleDobleListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
