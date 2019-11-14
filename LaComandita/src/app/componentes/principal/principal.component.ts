import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/servicios/http.service';
import { UsuarioActualService } from 'src/app/servicios/usuario-actual.service';
import { Usuario } from 'src/app/clases/usuario';
import { Pedido } from 'src/app/clases/pedido';
import { Mesa } from 'src/app/clases/mesa';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private router: Router, private httpService: HttpService, private usuarioActualService: UsuarioActualService) { }

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
    //carousel imagenes
    this.usuario = this.usuarioActualService.usuario;
    this.redirigirSegunUsuario(this.usuario);
    console.log(this.usuario);
    this.images = [];
    this.images.push({ source: "../../../assets/imagenes/restaurant/1.jpg", alt: 'Description for Image 1', title: 'Title 1' });
    this.images.push({ source: '"../../../assets/imagenes/restaurant/2.jpeg', alt: 'Description for Image 2', title: 'Title 2' });
    this.images.push({ source: '"../../../assets/imagenes/restaurant/3.jpg', alt: 'Description for Image 12', title: 'Title 12' });
    //fin carousel
  }
  redirigirSegunUsuario(usuario) {
    switch (usuario.role) {
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
    }
  }
  cambiarEstadoDeMesa($event) {
    this.seleccionDeMesa = false;
    if ($event.asientos) {
      console.log(this.seleccionDeMesa);
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
    this.showDetalleDeOrden = true;
    // this.pedido.comidas.forEach(comida => {

    // });
    console.info(this.pedido);
  }

}
