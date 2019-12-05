import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaInformePedidoComponent } from './tabla-informe-pedido.component';

describe('TablaInformePedidoComponent', () => {
  let component: TablaInformePedidoComponent;
  let fixture: ComponentFixture<TablaInformePedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaInformePedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaInformePedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
