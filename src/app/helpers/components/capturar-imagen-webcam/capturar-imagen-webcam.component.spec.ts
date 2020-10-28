import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturarImagenWebcamComponent } from './capturar-imagen-webcam.component';

describe('CapturarImagenWebcamComponent', () => {
  let component: CapturarImagenWebcamComponent;
  let fixture: ComponentFixture<CapturarImagenWebcamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturarImagenWebcamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturarImagenWebcamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
