import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorListaSimpleComponent } from './selector-lista-simple.component';

describe('SelectorListaSimpleComponent', () => {
  let component: SelectorListaSimpleComponent;
  let fixture: ComponentFixture<SelectorListaSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorListaSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorListaSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
