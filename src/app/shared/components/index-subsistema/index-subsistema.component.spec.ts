import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexSubsistemaComponent } from './index-subsistema.component';

describe('IndexSubsistemaComponent', () => {
  let component: IndexSubsistemaComponent;
  let fixture: ComponentFixture<IndexSubsistemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexSubsistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexSubsistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
