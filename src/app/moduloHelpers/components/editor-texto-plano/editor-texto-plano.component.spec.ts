import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorTextoPlanoComponent } from './editor-texto-plano.component';

describe('EditorTextoPlanoComponent', () => {
  let component: EditorTextoPlanoComponent;
  let fixture: ComponentFixture<EditorTextoPlanoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorTextoPlanoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorTextoPlanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
