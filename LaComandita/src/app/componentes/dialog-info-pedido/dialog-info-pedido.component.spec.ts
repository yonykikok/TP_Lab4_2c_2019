import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInfoPedidoComponent } from './dialog-info-pedido.component';

describe('DialogInfoPedidoComponent', () => {
  let component: DialogInfoPedidoComponent;
  let fixture: ComponentFixture<DialogInfoPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogInfoPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInfoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
