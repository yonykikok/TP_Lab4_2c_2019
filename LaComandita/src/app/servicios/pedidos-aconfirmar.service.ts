import { Injectable } from '@angular/core';
import { Pedido } from '../clases/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosAConfirmarService {

  pedidos: Pedido[] = [];
  constructor() { }

  agregarPedidoALaLista(pedido: Pedido) {
    //verificar si ya existe el pedido (falta hacer)
    this.pedidos.push(pedido);
  }
}
