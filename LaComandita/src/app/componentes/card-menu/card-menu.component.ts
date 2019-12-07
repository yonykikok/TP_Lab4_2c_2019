import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as jsPDF from 'jspdf';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.css']
})
export class CardMenuComponent implements OnInit {

  @Input() imagen: string;
  @Input() titulo: string;
  @Input() precio: string;
  @Input() descripcion: string;
  @Input() textoBoton: string;
  @Input() routerLinkk: string;
  @Output() eventoFinalizarPedido: EventEmitter<any> = new EventEmitter<any>();

  mostrarDetallado: boolean = false;
  constructor(private messageService: MessageService) { }
  ngOnInit() {
  }
  MostrarDetallado() {
    this.mostrarDetallado = true;
  }
  Cerrar() {
    this.mostrarDetallado = false;
  }
  finalizarPedido($event) {
    this.eventoFinalizarPedido.emit($event)
    this.showSuccess();
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', key: "agregarMenu", summary: 'se agrego a tu pedido', detail: this.titulo });
  }

}
