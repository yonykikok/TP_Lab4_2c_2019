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
  keyGenerica: any = "";
  experiencia: string = "";
  mostrarEncuesta: boolean = false;
  resultado: number = 0;
  puntosMozo: number = 0;
  puntosRestaurante: number = 0;
  puntosMesa: number = 0;
  puntosCocinero: number = 0;
  msg: string = "";



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
    this.pedido = new Pedido();

    this.pedidosService.pedidos = JSON.parse(localStorage.getItem('pedidos'));
    if (!this.pedidosService.pedidos) {
      this.pedidosService.pedidos = [];
    }



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
    let ultimaFecha = new Date("2000-12-04 00:00:00");
    JSON.parse(lista).forEach(element => {

      let fechaDePedido = new Date(element.fecha);
      if (ultimaFecha.getTime() < fechaDePedido.getTime()) {
        ultimaFecha = fechaDePedido;
        ultimoPedido = element;
      }

    });
    // console.log(ultimoPedido);
    return ultimoPedido;
  }



  redirigirSegunUsuario(usuario) {
    switch (usuario.role) {
      case "cliente":
        this.pedidosService.pedidos = JSON.parse(localStorage.getItem('pedidos'));
        this.httpService.obtenerPedidosPorUsuario(this.usuario).subscribe(res => {
          this.ultimoPedidoClienteActual = this.obtenerUltimoPedidoDeLaLista(res);//obtengo el ultimo pedido del cliente
          if (this.ultimoPedidoClienteActual) {//si la lista existe
            let pedido = { "orden": this.ultimoPedidoClienteActual.orden, "mesa": this.ultimoPedidoClienteActual.mesa };
            this.httpService.obtenerPedidoPorOrdenYMesa(pedido).subscribe(res => {//obtengo el pedido real
              if (JSON.parse(res).estado == "cerrado") {
                this.mostrarIconoDeDetalle = false;
              }
              else {
                this.mostrarIconoDeDetalle = true;
              }
            });
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
          else if (pedido.estado == "cliente pagando") {
            this.mostrarEncuesta = true;
          }
          else if (pedido.estado == "cerrado") {
            this.showDetalleDeOrden = true;
          }


        } else {
          this.showDetalleDeOrden = true;
        }
      });
    }
    else {
      this.showDetalleDeOrden = true;
    }
  }

  // showInfo(demora) {
  //   this.messageService.add({ key: 'demora', severity: 'info', summary: 'Demora Actual' + demora, detail: 'Espera los ' + demora + " minutos, no jodas." });
  // }
  cerrarInformacion() {
    this.mostrarInformacion = false;
  }
  otracosa(hola) {
    console.info(hola);

  }

  handleRate(event) {
    this.resultado = this.puntosMesa + this.puntosMozo + this.puntosCocinero + this.puntosRestaurante;
    if (this.resultado <= 4) {
      this.msg = "Indignado";
    }
    else if (this.resultado > 4 && this.resultado <= 12) {
      this.msg = "Muy malo";
    }
    else if (this.resultado > 12 && this.resultado <= 25) {
      this.msg = "Regular";
    }
    else if (this.resultado > 25 && this.resultado <= 35) {
      this.msg = "Muy bueno";
    }
    else {
      this.msg = "Fascinado";
    }
  }
  enviarEncuesta() {
    let informacion: any;
    if (this.experiencia.length > 66) {
      this.MostrarNotificacion('warn', "Caracteres excedidos", "maxCaracteres", "Maximo son 66 caracteres y usted uso " + this.experiencia.length);
    }
    else {
      informacion = {
        "puntosCocinero": this.puntosCocinero,
        "puntosMozo": this.puntosMozo,
        "puntosMesa": this.puntosRestaurante,
        "puntosRestaurante": this.puntosRestaurante,
        "experiencia": this.experiencia,
        "mesa": this.ultimoPedidoClienteActual.mesa,
        "orden": this.ultimoPedidoClienteActual.orden
      };
      this.httpService.responderEncuesta(informacion).subscribe(res => {
        console.info(res);
        if (res.toString() == "Encuesta Enviada") {
          this.MostrarNotificacion("success", "Encuesta enviada", "enviado", "Gracias por su tiempo.");
        }
        else {
          this.MostrarNotificacion("warn", "Ups.", "error", res);
        }


      });
    }
  }
  MostrarNotificacion($severity, $summary, $key, $detail) {
    this.messageService.add({ severity: $severity, summary: $summary, key: $key, detail: $detail });
  }
}
