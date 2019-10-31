import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaOrdenPedidoComponent } from './tabla-orden-pedido.component';

describe('TablaOrdenPedidoComponent', () => {
  let component: TablaOrdenPedidoComponent;
  let fixture: ComponentFixture<TablaOrdenPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaOrdenPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaOrdenPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
