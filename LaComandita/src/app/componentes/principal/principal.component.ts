import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/servicios/http.service';
import { UsuarioActualService } from 'src/app/servicios/usuario-actual.service';
import { Usuario } from 'src/app/clases/usuario';
import { Pedido } from 'src/app/clases/pedido';
import { Mesa } from 'src/app/clases/mesa';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  //Historial de pedidos por usuario
  listaPedidosClienteActual: any[] = [];
  ultimoPedidoClienteActual;
  pedidoActual;
  mostrarInformacion: boolean = false;
  //Fin historial de pedidos por usuario
  constructor(private router: Router, private messageService: MessageService, private httpService: HttpService, private usuarioActualService: UsuarioActualService, private pedidosService: PedidosService) { }

  seleccionDeMesa: boolean = false;
  ocultarmenus: boolean = true;
  showDetalleDeOrden: boolean = false;
  mesa: Mesa = new Mesa();
  images: any[];
  usuario: Usuario = new Usuario();
  pedido: Pedido;
  mostrarIconoDeDetalle: boolean = false;
  ngOnInit() {
    this.pedidosService.pedidos = JSON.parse(localStorage.getItem('pedidos'));
    if (!this.pedidosService.pedidos) {
      this.pedidosService.pedidos = [];
    }
    this.pedido = new Pedido();


    this.configurarCarrousel();
    // this.verDetalleDelPedido();
  }
  configurarCarrousel() {
    //carousel imagenes
    this.usuario = this.usuarioActualService.usuario;
    this.redirigirSegunUsuario(this.usuario);
    this.images = [];
    this.images.push({ source: "../../../assets/imagenes/restaurant/1.jpg", alt: 'Description for Image 1', title: 'Title 1' });
    this.images.push({ source: '"../../../assets/imagenes/restaurant/2.jpeg', alt: 'Description for Image 2', title: 'Title 2' });
    this.images.push({ source: '"../../../assets/imagenes/restaurant/3.jpg', alt: 'Description for Image 12', title: 'Title 12' });
    //fin carousel
  }
  obtenerUltimoPedidoDeLaLista(lista) {
    this.listaPedidosClienteActual = JSON.parse(lista);

    let ultimoPedido;
    let contador = 0;
    let fechaActual;
    let diferenciaMinima = 999999999999999;
    JSON.parse(lista).forEach(element => {
      if (contador == 0) {
        fechaActual = new Date(element.fecha).getSeconds();
        contador++;
      }
      if ((fechaActual - new Date(element.fecha).getSeconds()) < diferenciaMinima) {
        diferenciaMinima = (new Date(element.fecha).getSeconds() - fechaActual)
        ultimoPedido = element;
      }
    });
    return ultimoPedido;
  }
  redirigirSegunUsuario(usuario) {
    switch (usuario.role) {
      case "cliente":
        this.httpService.obtenerPedidosPorUsuario(this.usuario).subscribe(res => {
          this.ultimoPedidoClienteActual = this.obtenerUltimoPedidoDeLaLista(res);
          if (this.ultimoPedidoClienteActual) {
            this.mostrarIconoDeDetalle=true;
          }
        });
        break;
      case "mozo":
        this.router.navigateByUrl('/mozo');
        break;
      case "bartender":
        this.router.navigateByUrl('/bartender');
        break;
      case "cervecero":
        this.router.navigateByUrl('/cervecero');
        break;
      case "cocinero":
        this.router.navigateByUrl('/cocinero');
        break;
      case "admin":
        this.router.navigateByUrl('/admin');
        break;
    }
  }
  cambiarEstadoDeMesa($event) {
    this.seleccionDeMesa = false;
    if ($event.asientos) {
      this.mesa = $event;
      this.pedido.mesa = this.mesa;
    }
  }
  mostrarSeleccionDeMesa() {
    this.seleccionDeMesa = true;
  }
  toggleOcultarMenu($event) {
    this.ocultarmenus = !$event;
  }
  ScrollToBottom() {
    this.ocultarmenus = true;
    window.scrollTo({ top: document.querySelector("#footer").scrollWidth, behavior: 'smooth' });

  }

  agregarCantidadAPedidoExistente(sector, pedido) {
    let banderaExiste = false;
    this.pedido[sector].forEach(element => {
      if (element.titulo == pedido.titulo) {
        banderaExiste = true;
        element.cantidad += pedido.cantidad;
      }
    });
    if (!banderaExiste) {
      this.pedido[sector].push(pedido);
    }
  }
  agregarALaOrdenActual($event) {
    if (!this.mostrarIconoDeDetalle) {
      window.scrollTo({ top: document.querySelector("#header").scrollTop, behavior: 'smooth' });
    }
    this.mostrarIconoDeDetalle = true;

    switch ($event[1].sector) {
      case "comidas":
        this.agregarCantidadAPedidoExistente("comidas", $event[0]);
        break;
      case "bebidas":
        this.agregarCantidadAPedidoExistente("bebidas", $event[0]);
        break;
      case "tragos":
        this.agregarCantidadAPedidoExistente("tragos", $event[0]);
        break;
      case "postres":
        this.agregarCantidadAPedidoExistente("postres", $event[0]);
        break;

    }
  }
  CerrarDetalladoDeOrden() {
    this.showDetalleDeOrden = false;
  }
  verDetalleDelPedido() {
    if (this.ultimoPedidoClienteActual) {
      this.httpService.getPedido(this.ultimoPedidoClienteActual).subscribe(res => {
        let pedido = JSON.parse(res);
        if (pedido) {
          if (pedido.estado == "pendiente" || pedido.estado == "en preparacion" || pedido.estado == "entregado" || pedido.estado == "en camino") {
            this.pedidoActual = pedido;
            this.mostrarInformacion = true;
            this.mostrarIconoDeDetalle = true;
          }

        } else {
          this.showDetalleDeOrden = true;
        }
      });
    }
    else {
      this.showDetalleDeOrden = true;
      console.info(this.pedido);
    }
  }

  // showInfo(demora) {
  //   this.messageService.add({ key: 'demora', severity: 'info', summary: 'Demora Actual' + demora, detail: 'Espera los ' + demora + " minutos, no jodas." });
  // }
  cerrarInformacion() {
    this.mostrarInformacion = false;
  }
}
