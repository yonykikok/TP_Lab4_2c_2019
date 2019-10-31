import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetalleDeOrdenComponent } from './dialog-detalle-de-orden.component';

describe('DialogDetalleDeOrdenComponent', () => {
  let component: DialogDetalleDeOrdenComponent;
  let fixture: ComponentFixture<DialogDetalleDeOrdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDetalleDeOrdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDetalleDeOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
