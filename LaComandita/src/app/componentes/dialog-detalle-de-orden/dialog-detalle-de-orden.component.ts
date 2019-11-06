import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Pedido } from 'src/app/clases/pedido';

@Component({
  selector: 'app-dialog-detalle-de-orden',
  templateUrl: './dialog-detalle-de-orden.component.html',
  styleUrls: ['./dialog-detalle-de-orden.component.css']
})
export class DialogDetalleDeOrdenComponent implements OnInit {

  @Output() eventoCerrarDetalladoDeOrden: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() pedidos: Pedido;
  checkedComidas: boolean;
  checkedBebidas: boolean;
  checkedTragos: boolean;
  checkedPostres: boolean;
  mostrarConfirmacion: boolean;
  constructor() { }

  CerrarDetallado() {
    this.eventoCerrarDetalladoDeOrden.emit(null);
  }
  ngOnInit() {
    if (this.pedidos.bebidas.length > 0) {
      this.checkedBebidas = true;
    }
    if (this.pedidos.comidas.length > 0) {
      this.checkedComidas = true;
    }
    if (this.pedidos.tragos.length > 0) {
      this.checkedTragos = true;
    }
    if (this.pedidos.postres.length > 0) {
      this.checkedPostres = true;
    }

  }
  confirmarPedido() {
    this.mostrarConfirmacion = true;
  }
  cancelarConfirmacion() {
    this.mostrarConfirmacion = false;
  }
  pedidoConfirmado() {
    console.info(this.pedidos);
    this.mostrarConfirmacion = false;
  }
}
