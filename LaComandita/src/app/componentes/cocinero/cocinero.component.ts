import { Component, OnInit } from '@angular/core';
import { UsuarioActualService } from 'src/app/servicios/usuario-actual.service';

@Component({
  selector: 'app-cocinero',
  templateUrl: './cocinero.component.html',
  styleUrls: ['./cocinero.component.css']
})
export class CocineroComponent implements OnInit {

  constructor(private usuarioActualService: UsuarioActualService) { }
  usuario = this.usuarioActualService.usuario;
  mostrarIconoDeDetalle: boolean = true;
  ngOnInit() {
  }
  verListaDePedidos() {
    console.log("HOLA");
  }
}
