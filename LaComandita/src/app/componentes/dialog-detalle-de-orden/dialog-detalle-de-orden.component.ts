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
  constructor() { }

  CerrarDetallado() {
    this.eventoCerrarDetalladoDeOrden.emit(null);
  }
  ngOnInit() {
    // this.pedidos.comidas.push({
    //   "cantidad": 3,
    //   "id": 2,
    //   "precio": 323,
    //   "titulo": "nose",
    // })
  }

}
