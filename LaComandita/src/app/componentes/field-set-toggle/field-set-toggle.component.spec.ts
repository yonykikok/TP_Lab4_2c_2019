import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldSetToggleComponent } from './field-set-toggle.component';

describe('FieldSetToggleComponent', () => {
  let component: FieldSetToggleComponent;
  let fixture: ComponentFixture<FieldSetToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldSetToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldSetToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
