import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepararPedidoComponent } from './preparar-pedido.component';

describe('PrepararPedidoComponent', () => {
  let component: PrepararPedidoComponent;
  let fixture: ComponentFixture<PrepararPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepararPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepararPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
