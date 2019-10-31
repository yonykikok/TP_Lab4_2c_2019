import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CerveceroComponent } from './cervecero.component';

describe('CerveceroComponent', () => {
  let component: CerveceroComponent;
  let fixture: ComponentFixture<CerveceroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CerveceroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CerveceroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
