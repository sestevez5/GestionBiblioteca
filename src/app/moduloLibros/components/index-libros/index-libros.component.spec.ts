import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexLibrosComponent } from './index-libros.component';

describe('IndexLibrosComponent', () => {
  let component: IndexLibrosComponent;
  let fixture: ComponentFixture<IndexLibrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexLibrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
