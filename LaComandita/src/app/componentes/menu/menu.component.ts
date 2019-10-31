import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comida } from 'src/app/clases/comida';
import { Trago } from 'src/app/clases/trago';
import { Bebida } from 'src/app/clases/bebida';
import { Postre } from 'src/app/clases/postre';
import { HttpService } from 'src/app/servicios/http.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  sectores: any[];
  mostrarComidas: boolean = false;
  mostrarBebidas: boolean = false;
  mostrarTragos: boolean = false;
  mostrarPostres: boolean = false;
  @Input() ocultarTodo: boolean;
  comidas: Comida[] = new Array();
  bebidas: Bebida[] = new Array();
  postres: Postre[] = new Array();
  tragos: Trago[] = new Array();
  @Output() toggleOcultarMenu: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventoAgregarALaOrden: EventEmitter<any> = new EventEmitter<any>();

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.sectores = [];
    this.httpService.getAll().subscribe(res => {
      if (res["comidas"]) {
        this.comidas = res["comidas"];
      }
      if (res["bebidas"]) {
        this.bebidas = res["bebidas"];
      }
      if (res["postres"]) {
        this.postres = res["postres"];
      }
      if (res["tragos"]) {
        this.tragos = res["tragos"];
      }
    })
    this.sectores.push(
      { "nombre": "Comidas", "imagen": "../../../assets/imagenes/comidas/menuComidas.png", routerLink: "/comidas" },
      { "nombre": "Bebidas", "imagen": "../../../assets/imagenes/bebidas/bebidas.png", routerLink: "/bebidas" },
      { "nombre": "Postres", "imagen": "../../../assets/imagenes/postres/postres.jpg", routerLink: "/postres" },
      { "nombre": "Tragos", "imagen": "../../../assets/imagenes/tragos/tragos.jpg", routerLink: "/tragos" }
    )
  }

  MostrarMenu($sector) {
    this.toggleOcultarMenu.emit(true);
    switch ($sector) {
      case "Comidas":
        this.mostrarComidas = true;
        this.mostrarBebidas = false;
        this.mostrarPostres = false;
        this.mostrarTragos = false;
        break;
      case "Bebidas":
        this.mostrarComidas = false;
        this.mostrarBebidas = true;
        this.mostrarPostres = false;
        this.mostrarTragos = false;
        break;
      case "Postres":
        this.mostrarComidas = false;
        this.mostrarBebidas = false;
        this.mostrarPostres = true;
        this.mostrarTragos = false;
        break;
      case "Tragos":
        this.mostrarComidas = false;
        this.mostrarBebidas = false;
        this.mostrarPostres = false;
        this.mostrarTragos = true;
        break;
    }
    setTimeout(() => {
      window.scrollTo({ top: document.querySelector("#footer").scrollWidth, behavior: 'smooth' });

    }, 1500);

  }
  agregarPedidoALaOrden($event) {
    this.eventoAgregarALaOrden.emit($event);
  }

}
