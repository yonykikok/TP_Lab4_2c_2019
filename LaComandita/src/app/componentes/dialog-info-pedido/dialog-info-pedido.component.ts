import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PedidosService } from 'src/app/servicios/pedidos.service';

@Component({
  selector: 'app-dialog-info-pedido',
  templateUrl: './dialog-info-pedido.component.html',
  styleUrls: ['./dialog-info-pedido.component.css']
})
export class DialogInfoPedidoComponent implements OnInit {

  @Input() pedido: any;
  checkedPropina: boolean = false;
  cuentaPedida: boolean = false;
  ultimaPropina: number;
  @Output() eventoCerrarInformacion: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private pedidosService: PedidosService) { }

  ngOnInit() {
    this.ultimaPropina = 0;
    let lista = JSON.parse(localStorage.getItem("pedidosACobrar"));
    if (lista) {
      lista.forEach(element => {
        if (element.orden == this.pedido.orden && element.mesa == this.pedido.mesa) {//si se encuentra es que ya pidio la cuenta.
          this.cuentaPedida = true;
        }
      });
    }
  }
  CerrarDetallado() {
    this.eventoCerrarInformacion.emit(null);
  }
  calcularPrecio($pedido) {
    if (this.checkedPropina) {
      this.ultimaPropina = Math.floor(($pedido.facturacion * 1.10) - $pedido.facturacion);
      $pedido.facturacion += this.ultimaPropina;
      $pedido['propina'] = this.ultimaPropina;

    }
    else {
      $pedido['propina'] = 0;
      $pedido.facturacion -= this.ultimaPropina;
    }

  }
  pedirCuenta($pedido) {
    if (!$pedido['propina']) {
      $pedido['propina'] = 0;
    }
    $pedido['cobrado'] = false;//digo que pidio la cuenta pero que no esta cobrado para que el mozo lo vea

    this.cuentaPedida = true;
    this.pedidosService.agregarPedidoACobrar($pedido);
  }
}
