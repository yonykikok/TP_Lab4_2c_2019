import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { Pedido } from 'src/app/clases/pedido';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() EventMostrarPedido: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() user: Usuario = new Usuario();
  @Input() mostrarDetalle: boolean;
  constructor() { }
  ngOnInit() {
  }
  LanzarEventoMostrarPedido() {
    this.EventMostrarPedido.emit(true);
  }
}
