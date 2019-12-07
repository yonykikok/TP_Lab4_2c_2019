import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-preparar-pedido',
  templateUrl: './preparar-pedido.component.html',
  styleUrls: ['./preparar-pedido.component.css']
})
export class PrepararPedidoComponent implements OnInit {

  @Input() lista: any[];
  @Output() eventPreparar: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventTerminar: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventFiltrar: EventEmitter<any> = new EventEmitter<any>();
  checkedRecientes: boolean = true;
  checkedEnPreparacion: boolean = true;
  checkedTerminadas: boolean = true;
  constructor() { }

  ngOnInit() {

  }
  prepararPedido($pedido) {
    this.eventPreparar.emit($pedido);
  }
  terminarPedido($pedido) {
    this.eventTerminar.emit($pedido);
  }
  filtrarTabla() {
    let criterio = ["", "", ""];
    if (this.checkedRecientes) {
      criterio[0] = "pendiente";
    }
    if (this.checkedEnPreparacion) {
      criterio[1] = "en preparacion";
    }
    if (this.checkedTerminadas) {
      criterio[2] = "listo para servir";
    }
    this.eventFiltrar.emit(criterio);

  }
}
