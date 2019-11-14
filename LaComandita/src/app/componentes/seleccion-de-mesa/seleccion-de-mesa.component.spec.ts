import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionDeMesaComponent } from './seleccion-de-mesa.component';

describe('SeleccionDeMesaComponent', () => {
  let component: SeleccionDeMesaComponent;
  let fixture: ComponentFixture<SeleccionDeMesaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionDeMesaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionDeMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
