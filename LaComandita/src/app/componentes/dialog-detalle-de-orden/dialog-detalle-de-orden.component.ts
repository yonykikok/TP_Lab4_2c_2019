import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Pedido } from 'src/app/clases/pedido';
import { Mesa } from 'src/app/clases/mesa';
import { PedidosService } from 'src/app/servicios/pedidos.service';

@Component({
  selector: 'app-dialog-detalle-de-orden',
  templateUrl: './dialog-detalle-de-orden.component.html',
  styleUrls: ['./dialog-detalle-de-orden.component.css']
})
export class DialogDetalleDeOrdenComponent implements OnInit {

  @Output() eventoCerrarDetalladoDeOrden: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() eventoMostrarSeleccionDeMesa: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() pedidos: Pedido;
  @Input() mesa: Mesa;
  checkedComidas: boolean;
  checkedBebidas: boolean;
  checkedTragos: boolean;
  checkedPostres: boolean;
  mostrarConfirmacion: boolean;
  constructor(private pedidosAConfirmarService: PedidosService) { }

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
    if (this.mesa.asientos) {
      this.mostrarConfirmacion = true;
    }
    else {
      this.eventoMostrarSeleccionDeMesa.emit();

    }
  }
  cancelarConfirmacion() {
    this.mostrarConfirmacion = false;
  }
  pedidoConfirmado() {
    this.pedidos.estado = "";
    let bandera = -1;
    this.pedidosAConfirmarService.pedidos.forEach(pedido => {
      if (pedido == this.pedidos) {
        bandera = 0;
      }
    });
    if (bandera != 0) {
      this.pedidosAConfirmarService.pedidos.push(this.pedidos);
    }
    this.mostrarConfirmacion = false;

  }
}
