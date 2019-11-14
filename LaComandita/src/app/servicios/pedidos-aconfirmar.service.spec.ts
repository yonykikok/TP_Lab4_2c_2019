import { TestBed } from '@angular/core/testing';

import { PedidosAConfirmarService } from './pedidos-aconfirmar.service';

describe('PedidosAConfirmarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PedidosAConfirmarService = TestBed.get(PedidosAConfirmarService);
    expect(service).toBeTruthy();
  });
});
