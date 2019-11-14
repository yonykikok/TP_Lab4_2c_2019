import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { Pedido } from 'src/app/clases/pedido';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() EventMostrarPedido: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() user: Usuario = new Usuario();
  @Input() mostrarDetalle: boolean;
  @Input() role: string = "";

  constructor(private router: Router) { }
  ngOnInit() {
    this.role = this.user.role;
  }
  LanzarEventoMostrarPedido() {
    this.EventMostrarPedido.emit(true);
  }
  logout() {
    sessionStorage.setItem("token", "");
    this.router.navigateByUrl('/login');
  }
  
}
