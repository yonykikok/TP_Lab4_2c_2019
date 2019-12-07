import { Component, OnInit } from '@angular/core';
import { UsuarioActualService } from 'src/app/servicios/usuario-actual.service';
import { HttpService } from 'src/app/servicios/http.service';

@Component({
  selector: 'app-cervecero',
  templateUrl: './cervecero.component.html',
  styleUrls: ['./cervecero.component.css']
})
export class CerveceroComponent implements OnInit {
  mostrarSpinner:boolean=false;

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
    this.mostrarSpinner=true;
    this.httpService.obtenerTodosLosPedidos("Cervecero").subscribe(res => {
      this.mostrarSpinner=false;
      if (res.toString() == "sin pedidos") {
      }
      else {
        this.lista = res;
        this.lista.forEach(element => {
          if (element.idTrago != 1000) {
            auxLista.push(element);

          }
        });
        this.lista = auxLista;
      }
      this.FiltrarTablaPor(this.criterio);
    });
  }
  PrepararPedido($event) {
    this.mostrarSpinner=true;
    this.httpService.prepararPedido('Cervecero', $event.orden).subscribe(res => {
      this.mostrarSpinner=false;
      // console.info(res);
      this.actualizarLista();
    });

  }
  TerminarPedido($event) {
    this.mostrarSpinner=true;
    this.httpService.terminarPedido('Cervecero', $event.orden).subscribe(res => {
      this.mostrarSpinner=false;
      // console.log(res);
      this.actualizarLista();
    });

  }

  FiltrarTablaPor($event) {
    this.criterio = $event;
    let auxLista = [];
    this.lista.forEach(pedido => {
      if (pedido.estado == $event[0] || pedido.estado == $event[1] || pedido.estado == $event[2]) {
        if (pedido.idTrago != 1000) {
          auxLista.push(pedido);
        }
      }
    });
    this.listaAMostrar = auxLista;
  }
  verListaDePedidos() {
    this.mostrarListado = !this.mostrarListado;
  }
}
