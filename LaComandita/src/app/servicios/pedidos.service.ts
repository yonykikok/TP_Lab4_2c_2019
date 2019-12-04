import { Injectable } from '@angular/core';
import { Pedido } from '../clases/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  pedidos: Pedido[] = [];
  pedidosACobrar: any[] = [];
  
  constructor() { }

  agregarPedidoALaLista(pedido: Pedido) {
    this.pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(this.pedidos));
  }
  agregarPedidoACobrar(pedido: any) {
    this.pedidosACobrar.push(pedido);
    localStorage.setItem("pedidosACobrar", JSON.stringify(this.pedidosACobrar));
  }
}
