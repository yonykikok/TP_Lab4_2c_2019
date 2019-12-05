import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Pedido } from 'src/app/clases/pedido';
import { Mesa } from 'src/app/clases/mesa';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { MessageService } from 'primeng/api';
import { Cliente } from 'src/app/clases/pedido/cliente';
import { UsuarioActualService } from 'src/app/servicios/usuario-actual.service';
import { HttpService } from 'src/app/servicios/http.service';

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
  constructor(private httpService: HttpService, private pedidosAConfirmarService: PedidosService, private messageService: MessageService, private usuarioActual: UsuarioActualService) { }

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
    this.pedidos.cliente.nombre = this.usuarioActual.usuario.nombre;
    console.log(this.pedidosAConfirmarService.pedidos);
    if (this.pedidosAConfirmarService.pedidos) {
      this.pedidosAConfirmarService.pedidos.forEach(pedido => {
        if (pedido == this.pedidos) {
          bandera = 0;
          this.showUpdate();
        }
      });
      if (bandera != 0) {
        // this.pedidosAConfirmarService.pedidos.push(this.pedidos);
        this.pedidosAConfirmarService.agregarPedidoALaLista(this.pedidos);
        this.showSuccess();
      }
    }
    else {
      this.pedidosAConfirmarService.pedidos = [];
      this.pedidosAConfirmarService.agregarPedidoALaLista(this.pedidos);
      this.showSuccess();
    }
    this.mostrarConfirmacion = false;
  }
  showSuccess() {
    this.messageService.add({ key: "confirmado", severity: 'success', summary: 'Pedido enviado', detail: 'El mozo confirmara el pedido' });
  }
  showUpdate() {
    this.messageService.add({ key: "actualizado", severity: 'info', summary: 'Pedido actualizado', detail: 'El mozo vera los cambios' });
  }
}
