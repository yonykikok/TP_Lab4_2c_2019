import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { HttpService } from 'src/app/servicios/http.service';
import { UsuarioActualService } from 'src/app/servicios/usuario-actual.service';

@Component({
  selector: 'app-bartender',
  templateUrl: './bartender.component.html',
  styleUrls: ['./bartender.component.css']
})
export class BartenderComponent implements OnInit {
  constructor(private usuarioActualService: UsuarioActualService) { }
  usuario = this.usuarioActualService.usuario;
  mostrarIconoDeDetalle: boolean = true;
  ngOnInit() {
  }
  verListaDePedidos() {
    console.log("HOLA");
  }

}
