import { Component, OnInit } from '@angular/core';
import { UsuarioActualService } from 'src/app/servicios/usuario-actual.service';

@Component({
  selector: 'app-cervecero',
  templateUrl: './cervecero.component.html',
  styleUrls: ['./cervecero.component.css']
})
export class CerveceroComponent implements OnInit {

  constructor(private usuarioActualService: UsuarioActualService) { }
  usuario = this.usuarioActualService.usuario;
  mostrarIconoDeDetalle: boolean=true;
  ngOnInit() {
  }
  verListaDePedidos() {
    console.log("HOLA");
  }

}
