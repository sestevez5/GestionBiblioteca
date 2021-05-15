import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSelectorMultipleDobleListaComponent } from './item-selector-lista-simple-modeloLista.component';

describe('ItemSelectorMultipleDobleListaComponent', () => {
  let component: ItemSelectorMultipleDobleListaComponent;
  let fixture: ComponentFixture<ItemSelectorMultipleDobleListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSelectorMultipleDobleListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSelectorMultipleDobleListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
