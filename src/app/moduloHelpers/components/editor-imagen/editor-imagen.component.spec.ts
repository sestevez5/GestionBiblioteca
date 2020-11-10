import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorImagenComponent } from './editor-imagen.component';

describe('EditorImagenComponent', () => {
  let component: EditorImagenComponent;
  let fixture: ComponentFixture<EditorImagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorImagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
