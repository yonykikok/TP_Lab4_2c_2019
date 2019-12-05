import { Component, OnInit } from '@angular/core';
import { UsuarioActualService } from 'src/app/servicios/usuario-actual.service';
import { User } from 'src/app/clases/user';
import { Usuario } from 'src/app/clases/usuario';
import { HttpService } from 'src/app/servicios/http.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  titulo: string = "";
  mostrarInforme: boolean = false;
  mostrarInformePedidos: boolean = false;
  mostrarComentarios: boolean = false;
  listaInforme: any[] = [];
  listaInformePedidos: any[] = [];
  listaInformeEncuestas: any[] = [];
  listaAtributos: any[] = [];

  mesasEsperandoCierre: any[] = [];
  mostrarDialog: boolean = false;
  mesasEsperando: boolean = false;

  constructor(private messageService: MessageService, private usuarioActualService: UsuarioActualService, private httpService: HttpService) {
  }
  usuario = this.usuarioActualService.usuario;
  ngOnInit() {
    this.actualizarMesasACerrar();

  }
  actualizarMesasACerrar() {
    this.httpService.obtenerMesasACerrar().subscribe(res => {
      if (res == "Sin cierres pendientes") {
        this.mesasEsperando = false;
      }
      else {
        this.mesasEsperando = true;

        let lista = JSON.parse(res.toString());
        this.mesasEsperandoCierre = lista;
      }
    });
  }
  CerrarMesa($pedidoDeMesa) {

    this.httpService.cerrarMesa($pedidoDeMesa).subscribe(res => {
      if (res.toString() == "Mesa Cerrada") {
        this.MostrarNotificacion("success", "Mesa Cerrada", "mesaCerrada", "");
        this.actualizarMesasACerrar();
      }
    });
    this.httpService.liberarMesas().subscribe(res => {
      console.log(res);
    });
  }
  showDialog() {
    this.mostrarDialog = true;
  }

  mostrarYOcularContenido(mostrar) {

    switch (mostrar) {
      case "mesas":
        this.mostrarInforme = true;
        this.mostrarComentarios = false;
        this.mostrarInformePedidos = false;
        break;
      case "pedidos":
        this.mostrarInforme = false;
        this.mostrarComentarios = false;
        this.mostrarInformePedidos = true;
        break;
      case "comentarios":
        this.mostrarInforme = false;
        this.mostrarInformePedidos = false;
        this.mostrarComentarios = true;
        break;

    }
  }

  mesaMasUsada($titulo) {
    this.mostrarYOcularContenido("mesas");
    this.informeUsosDeMesa($titulo, "Socio/Administracion/Mesas/MasUsada");
  }
  mesaMenosUsada($titulo) {
    this.mostrarYOcularContenido("mesas");
    this.informeUsosDeMesa($titulo, "Socio/Administracion/Mesas/MenosUsada");
  }
  mesaDeMejorFacturacion($titulo) {
    this.mostrarYOcularContenido("mesas");

    this.informeFacturacionDeMesa($titulo, "Socio/Administracion/Mesas/MejorFacturacion");
  }
  mesaDePeorFacturacion($titulo) {
    this.mostrarYOcularContenido("mesas");

    this.informeFacturacionDeMesa($titulo, "Socio/Administracion/Mesas/PeorFacturacion");
  }
  mesaConPedidoMasCaro($titulo) {
    this.mostrarYOcularContenido("mesas");

    this.informeFacturacionDePedido($titulo, "Socio/Administracion/Mesas/FacturaMasAlta");
  }
  mesaConPedidoMasBarato($titulo) {
    this.mostrarYOcularContenido("mesas");

    this.informeFacturacionDePedido($titulo, "Socio/Administracion/Mesas/FacturaMasBaja");
  }

  pedidoMasVendido($titulo) {
    this.mostrarYOcularContenido("pedidos");

    this.titulo = $titulo;
    this.httpService.obtenerDatos("Socio/Administracion/Pedidos/MasVendido").subscribe(res => {
      let auxLista = JSON.parse(res);
      this.listaInformePedidos = auxLista;
    });
  }
  pedidoMenosVendidos($titulo) {
    this.mostrarYOcularContenido("pedidos");
    this.titulo = $titulo;
    this.httpService.obtenerDatos("Socio/Administracion/Pedidos/MenosVendido").subscribe(res => {
      let auxLista = JSON.parse(res);
      this.listaInformePedidos = auxLista;
    });
  }
  mejoresComentarios($titulo) {
    this.mostrarYOcularContenido("comentarios");
    this.informeComentarios($titulo, "Socio/Administracion/Mesas/MejoresComentarios");
  }
  peoresComentarios($titulo) {
    this.mostrarYOcularContenido("comentarios");
    this.informeComentarios($titulo, "Socio/Administracion/Mesas/PeoresComentarios");
  }
  MostrarNotificacion($severity, $summary, $key, $detail) {
    this.messageService.add({ severity: $severity, summary: $summary, key: $key, detail: $detail });
  }
  informeComentarios($titulo, url) {
    this.titulo = $titulo;
    this.httpService.obtenerDatos(url).subscribe(res => {
      let encuestas = JSON.parse(res);
      this.listaInformeEncuestas = encuestas;
    });
  }
  informeUsosDeMesa(titulo, url) {
    this.reiniciarListasInformes();
    this.titulo = titulo;
    let listaAMostrar: any[] = [];
    this.listaAtributos['mesa'] = "Mesa";
    this.listaAtributos['ubicacion'] = "Ubicacion";
    this.listaAtributos['asientos'] = "Asientos";
    this.listaAtributos['usos'] = "Usos";
    this.httpService.obtenerDatos(url).subscribe(res => {
      let auxLista = JSON.parse(res);
      console.log(auxLista);
      if (auxLista) {
        auxLista.forEach(element => {
          listaAMostrar.push({ "mesa": element.mesa, "ubicacion": element.ubicacion, "asientos": element.asientos, "usos": element.usos });
        });
      }
      this.listaInforme = listaAMostrar;

    });
  }
  informeFacturacionDePedido($titulo, url) {
    let listaAMostrar: any[] = [];
    this.reiniciarListasInformes();
    this.listaAtributos['mesa'] = "Mesa";
    this.listaAtributos['orden'] = "Orden";
    this.listaAtributos['total'] = "Total";
    this.titulo = $titulo;
    this.httpService.obtenerDatos(url).subscribe(res => {
      let auxLista = JSON.parse(res);
      if (auxLista.lenght > 1) {
        auxLista.forEach(element => {
          listaAMostrar.push({ "mesa": element.mesa, "ubicacion": element.ubicacion, "asientos": element.asientos, "usos": element.usos, "total": element.total });
        });
        this.listaInforme = listaAMostrar;
      }
      else {
        this.listaInforme.push(auxLista);
      }
    });
  }
  informeFacturacionDeMesa($titulo, url) {
    let listaAMostrar: any[] = [];
    this.reiniciarListasInformes();
    this.listaAtributos['mesa'] = "Mesa";
    this.listaAtributos['ubicacion'] = "Ubicacion";
    this.listaAtributos['asientos'] = "Asientos";
    this.listaAtributos['usos'] = "Usos";
    this.listaAtributos['total'] = "Total";
    this.titulo = $titulo;
    this.httpService.obtenerDatos(url).subscribe(res => {
      let auxLista = JSON.parse(res);
      if (auxLista.lenght > 1) {
        auxLista.forEach(element => {
          listaAMostrar.push({ "mesa": element.mesa, "ubicacion": element.ubicacion, "asientos": element.asientos, "usos": element.usos, "total": element.total });
        });
        this.listaInforme = listaAMostrar;
      }
      else {
        this.listaInforme.push(auxLista);
      }
    });
  }
  reiniciarListasInformes() {
    this.listaAtributos = [];
    this.listaInforme = [];
    this.listaInformeEncuestas = [];
  }

}
