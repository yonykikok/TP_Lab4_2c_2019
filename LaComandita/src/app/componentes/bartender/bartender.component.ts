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
  constructor(private usuarioActualService: UsuarioActualService, private httpService: HttpService) { }
  usuario = this.usuarioActualService.usuario;
  mostrarIconoDeDetalle: boolean = true;
  lista: any;// lista completa
  listaAMostrar: any;//lista que se va a mostrar
  mostrarListado: boolean = false;
  criterio = ["pendiente", "en preparacion", "listo para servir"];
  ngOnInit() {
    this.actualizarLista();
  }
  actualizarLista() {
    let auxLista = [];
    this.httpService.obtenerTodosLosPedidos("Bartender").subscribe(res => {
      if (res.toString() == "sin pedidos") {
        console.info(res);
      }
      else {
        this.lista = res;
        this.lista.forEach(element => {
          if (element.idTrago != 1000) {
            auxLista.push(element);
            // console.log(element);

          }
        });
        this.lista = auxLista;
      }
      this.FiltrarTablaPor(this.criterio);
    });
  }
  PrepararPedido($event) {
    this.httpService.prepararPedido('Bartender', $event.orden).subscribe(res => {
      // console.info(res);
      this.actualizarLista();
    });

  }
  TerminarPedido($event) {
    this.httpService.terminarPedido('Bartender', $event.orden).subscribe(res => {
      // console.log(res);
      this.actualizarLista();
    });

  }

  FiltrarTablaPor($event) {
    this.criterio = $event;
    let auxLista = [];
    if (this.lista) {

      this.lista.forEach(pedido => {
        if (pedido.estado == $event[0] || pedido.estado == $event[1] || pedido.estado == $event[2]) {
          if (pedido.idTrago != 1000) {
            auxLista.push(pedido);
          }
        }
      });
      this.listaAMostrar = auxLista;
    }
  }
  verListaDePedidos() {
    this.mostrarListado = !this.mostrarListado;
  }
}
