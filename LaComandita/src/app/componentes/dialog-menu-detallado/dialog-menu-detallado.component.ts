import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialog-menu-detallado',
  templateUrl: './dialog-menu-detallado.component.html',
  styleUrls: ['./dialog-menu-detallado.component.css']
})
export class DialogMenuDetalladoComponent implements OnInit {
  @Input() imagen: string;
  @Input() titulo: string;
  @Input() textoBoton: string;
  @Input() routerLinkk: string;
  @Input() precio: number;
  @Output() eventoCerrarDetallado: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() eventoFinalizarPedido: EventEmitter<any> = new EventEmitter<any>();
  val: number = 1;


  constructor() { }

  ngOnInit() {

  }
  FinalizarPedido() {
    // console.log("Finalizo el pedido con ", this.val, " porciones de ", this.imagen);
    let filename = this.imagen.substring(this.imagen.lastIndexOf('/') + 1);//obtenco el nombre de la imagen sin el path
    let id = filename[0];//separo el id
    let pedido = {
      "cantidad": this.val,
      "id": id,
      "precio": this.precio,
      "titulo": this.titulo,
      "imagen":this.imagen
    }
    this.eventoFinalizarPedido.emit(pedido);
    this.CerrarDetallado();
  }
  CerrarDetallado() {
    this.eventoCerrarDetallado.emit(null);
  }

}
