import { Component, OnInit } from '@angular/core';
import { UsuarioActualService } from 'src/app/servicios/usuario-actual.service';
import { HttpService } from 'src/app/servicios/http.service';

@Component({
  selector: 'app-cocinero',
  templateUrl: './cocinero.component.html',
  styleUrls: ['./cocinero.component.css']
})
export class CocineroComponent implements OnInit {

  usuario = this.usuarioActualService.usuario;
  mostrarIconoDeDetalle: boolean = true;
  criterio = ["pendiente", "en preparacion", "listo para servir"];
  //Comidas
  listaComidas: any;// lista completa
  listaAMostrarComidas: any;//lista que se va a mostrar
  mostrarListadoComidas: boolean = false;
  //Postres
  listaPostres: any;// lista completa
  listaAMostrarPostres: any;//lista que se va a mostrar
  mostrarListadoPostres: boolean = false;

  constructor(private usuarioActualService: UsuarioActualService, private httpService: HttpService) { }

  ngOnInit() {
    this.actualizarListaComidas();
    this.actualizarListaPostres();
  }

  //POSTRES
  buscarImagenPorId(tabla, id) {
    this.httpService.buscarImagenPorId(tabla, id).subscribe(res => {
      console.log(res);
    });
  }
  actualizarListaPostres() {
    let auxLista = [];
    this.httpService.obtenerTodosLosPedidos("Cocinero/Postres").subscribe(res => {
      if (res.toString() == "sin pedidos") {
      }
      else {
        this.listaPostres = res;
        this.listaPostres.forEach(element => {
          if (element.idTrago != 1000) {
            auxLista.push(element);
          }
        });
        this.listaPostres = auxLista;
      }
      this.FiltrarTablaPostresPor(this.criterio);
    });
  }

  PrepararPedidoPostre($event) {
    this.httpService.prepararPedido('Cocinero/Postres', $event.orden).subscribe(res => {
      console.log(res);
      this.actualizarListaPostres();
    });

  }
  TerminarPedidoPostre($event) {
    this.httpService.terminarPedido('Cocinero/Postres', $event.orden).subscribe(res => {
      this.actualizarListaPostres();
    });

  }

  FiltrarTablaPostresPor($event) {
    this.criterio = $event;
    let auxLista = [];
    if (this.listaPostres) {

      this.listaPostres.forEach(pedido => {
        if (pedido.estado == $event[0] || pedido.estado == $event[1] || pedido.estado == $event[2]) {
          auxLista.push(pedido);
        }
      });
      this.listaAMostrarPostres = auxLista;
    }
  }


  //COMIDAS

  actualizarListaComidas() {
    let auxLista = [];
    this.httpService.obtenerTodosLosPedidos("Cocinero").subscribe(res => {
      if (res.toString() == "sin pedidos") {
        console.info(res);
      }
      else {
        this.listaComidas = res;
        this.listaComidas.forEach(element => {
          if (element.idTrago != 1000) {
            auxLista.push(element);
          }
        });
        this.listaComidas = auxLista;
      }
      this.FiltrarTablaPor(this.criterio);
    });
  }

  PrepararPedidoComida($event) {
    this.httpService.prepararPedido('Cocinero', $event.orden).subscribe(res => {
      this.actualizarListaComidas();
    });

  }
  TerminarPedidoComida($event) {
    this.httpService.terminarPedido('Cocinero', $event.orden).subscribe(res => {
      this.actualizarListaComidas();
    });

  }

  FiltrarTablaPor($event) {
    this.criterio = $event;
    let auxLista = [];
    this.listaComidas.forEach(pedido => {
      if (pedido.estado == $event[0] || pedido.estado == $event[1] || pedido.estado == $event[2]) {
        auxLista.push(pedido);
      }
    });
    this.listaAMostrarComidas = auxLista;
  }
  verListaDePedidos() {
    this.mostrarListadoComidas = !this.mostrarListadoComidas;
    this.mostrarListadoPostres = !this.mostrarListadoPostres;
  }
}
