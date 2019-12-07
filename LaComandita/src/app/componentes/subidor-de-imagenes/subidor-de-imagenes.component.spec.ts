import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubidorDeImagenesComponent } from './subidor-de-imagenes.component';

describe('SubidorDeImagenesComponent', () => {
  let component: SubidorDeImagenesComponent;
  let fixture: ComponentFixture<SubidorDeImagenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubidorDeImagenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubidorDeImagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
