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
  listaExcel: any;
  nombreExcel: string;
  mostrarBtnExcel: boolean = false;

  checkedComidas: boolean = true;
  checkedBebidas: boolean = true;
  checkedTragos: boolean = true;
  checkedPostres: boolean = true;

  mostrarSpinner: boolean = false;
  titulo: string = "";
  data: any;
  mostrarPie: boolean = false;
  infoPie: any = [];
  mostrarInforme: boolean = false;
  mostrarInformePedidos: boolean = false;
  mostrarComentarios: boolean = false;
  listaInforme: any[] = [];
  listaInformePedidos: any[] = [];
  listaInformeEncuestas: any[] = [];
  listaAtributos: any[] = [];
  datosPipe: any[] = [];
  mesasEsperandoCierre: any[] = [];
  mostrarDialog: boolean = false;
  mesasEsperando: boolean = false;

  constructor(private messageService: MessageService, private usuarioActualService: UsuarioActualService, private httpService: HttpService) {
  }
  usuario = this.usuarioActualService.usuario;
  ngOnInit() {
    this.actualizarMesasACerrar();

  }
  separarComentarios() {
    this.infoPie = [];
    let contadorIndignado = 0;
    let contadorMuyMalo = 0;
    let contadorRegular = 0;
    let contadorMuyBueno = 0;
    let contadorFascinado = 0;
    this.datosPipe.forEach(element => {
      if (element.puntuacionTotal <= 4) {
        contadorIndignado++;
      }
      else if (element.puntuacionTotal > 4 && element.puntuacionTotal <= 12) {
        contadorMuyMalo++;
      }
      else if (element.puntuacionTotal > 12 && element.puntuacionTotal <= 25) {
        contadorRegular++;
      }
      else if (element.puntuacionTotal > 25 && element.puntuacionTotal <= 35) {
        contadorMuyBueno++;
      }
      else {
        contadorFascinado++;
      }
    });
    this.infoPie.push(contadorIndignado);
    this.infoPie.push(contadorMuyMalo);
    this.infoPie.push(contadorRegular);
    this.infoPie.push(contadorMuyBueno);
    this.infoPie.push(contadorFascinado);

  }
  CargarDatosPie() {

    this.data = {
      labels: ['Indignado', 'Muy malo', 'Regular', 'Muy bueno', 'Fascinado'],
      datasets: [
        {
          data: [this.infoPie[0], this.infoPie[1], this.infoPie[2], this.infoPie[3], this.infoPie[4]],
          backgroundColor: [
            "#FF0000",
            "#FFB100",
            "#D1D1D1",
            "#B9FB58",
            "#24FF00",
          ],
          hoverBackgroundColor: [
            "#FF0000",
            "#FFB100",
            "#D1D1D1",
            "#B9FB58",
            "#24FF00",
          ]
        }]
    };
  }

  TraerTodosLosComentarios() {
    this.mostrarSpinner = true;

    this.httpService.obtenerDatos("Socio/Administracion/Mesas/MejoresComentarios").subscribe(res => {
      let encuestas = JSON.parse(res);
      encuestas.forEach(element => {
        this.datosPipe.push(element);
      });
      this.httpService.obtenerDatos("Socio/Administracion/Mesas/PeoresComentarios").subscribe(res => {
        let encuestas = JSON.parse(res);
        encuestas.forEach(element => {
          this.datosPipe.push(element);
        });
        this.separarComentarios();
        this.CargarDatosPie();
        this.mostrarSpinner = false;

      });
    });

  }
  actualizarMesasACerrar() {
    this.mostrarSpinner = true;

    this.httpService.obtenerMesasACerrar().subscribe(res => {
      if (res == "Sin cierres pendientes") {
        this.mesasEsperando = false;
      }
      else {
        this.mesasEsperando = true;

        let lista = JSON.parse(res.toString());
        this.mesasEsperandoCierre = lista;
      }
      this.mostrarSpinner = false;
    });
  }
  CerrarMesa($pedidoDeMesa) {
    this.mostrarSpinner = true;
    this.httpService.cerrarMesa($pedidoDeMesa).subscribe(res => {
      this.mostrarSpinner = false;
      if (res.toString() == "Mesa Cerrada") {
        this.MostrarNotificacion("success", "Mesa Cerrada", "mesaCerrada", "");
        this.actualizarMesasACerrar();
      }
    });
    this.httpService.liberarMesas().subscribe(res => {
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
        this.mostrarPie = false;
        break;
      case "pedidos":
        this.mostrarInforme = false;
        this.mostrarComentarios = false;
        this.mostrarPie = false;
        this.mostrarInformePedidos = true;
        break;
      case "comentarios":
        this.mostrarInforme = false;
        this.mostrarPie = false;
        this.mostrarInformePedidos = false;
        this.mostrarComentarios = true;
        break;
      case "grafico":
        this.mostrarInforme = false;
        this.mostrarPie = true;
        this.mostrarInformePedidos = false;
        this.mostrarComentarios = false;
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
  estadisDeSatisfaccion() {
    this.mostrarYOcularContenido('grafico');
    this.TraerTodosLosComentarios();
    this.separarComentarios();
  }
  generarListaAparteParaExcel(lista, $titulo) {

    let listaParaExcel = [];
    lista['bebidas'].forEach(element => {
      listaParaExcel.push({ "nombre": element.nombre, "precio": element.precio, "cantidad": element.cantidadVendida });
    });
    lista['tragos'].forEach(element => {
      listaParaExcel.push({ "nombre": element.nombre, "precio": element.precio, "cantidad": element.cantidadVendida });
    });

    lista['comidas'].forEach(element => {
      listaParaExcel.push({ "nombre": element.nombre, "precio": element.precio, "cantidad": element.cantidadVendida });
    });

    lista['postres'].forEach(element => {
      listaParaExcel.push({ "nombre": element.nombre, "precio": element.precio, "cantidad": element.cantidadVendida });
    });

    this.cargarDatosExcel(listaParaExcel, $titulo);

  }
  pedidoMasVendido($titulo) {
    this.mostrarYOcularContenido("pedidos");
    this.mostrarSpinner = true;
    this.titulo = $titulo;
    this.httpService.obtenerDatos("Socio/Administracion/Pedidos/MasVendido").subscribe(res => {
      this.mostrarSpinner = false;
      let auxLista = JSON.parse(res);
      this.listaInformePedidos = auxLista;

      this.generarListaAparteParaExcel(this.listaInformePedidos, $titulo);

    });
  }
  pedidoMenosVendidos($titulo) {
    this.mostrarYOcularContenido("pedidos");
    this.titulo = $titulo;
    this.mostrarSpinner = true;
    this.httpService.obtenerDatos("Socio/Administracion/Pedidos/MenosVendido").subscribe(res => {
      this.mostrarSpinner = false;
      let auxLista = JSON.parse(res);
      this.listaInformePedidos = auxLista;
      this.generarListaAparteParaExcel(this.listaInformePedidos, $titulo);

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
    if ($titulo) {
      this.titulo = $titulo;
    }
    this.mostrarSpinner = true;
    this.httpService.obtenerDatos(url).subscribe(res => {
      this.mostrarSpinner = false;
      let encuestas = JSON.parse(res);
      this.listaInformeEncuestas = encuestas;
      this.cargarDatosExcel(this.listaInformeEncuestas, $titulo);

    });
  }
  cargarDatosExcel(listaInforme, titulo) {
    this.listaExcel = listaInforme;
    this.nombreExcel = titulo;
    this.mostrarBtnExcel = true;
  }
  informeUsosDeMesa(titulo, url) {
    this.reiniciarListasInformes();
    this.titulo = titulo;
    let listaAMostrar: any[] = [];
    this.listaAtributos['mesa'] = "Mesa";
    this.listaAtributos['ubicacion'] = "Ubicacion";
    this.listaAtributos['asientos'] = "Asientos";
    this.listaAtributos['usos'] = "Usos";
    this.mostrarSpinner = true;
    this.httpService.obtenerDatos(url).subscribe(res => {
      this.mostrarSpinner = false;
      let auxLista = JSON.parse(res);
      if (auxLista) {
        auxLista.forEach(element => {
          listaAMostrar.push({ "mesa": element.mesa, "ubicacion": element.ubicacion, "asientos": element.asientos, "usos": element.usos });
        });
      }
      this.listaInforme = listaAMostrar;
      this.cargarDatosExcel(this.listaInforme, titulo);
    });
  }
  informeFacturacionDePedido($titulo, url) {
    let listaAMostrar: any[] = [];
    this.reiniciarListasInformes();
    this.listaAtributos['mesa'] = "Mesa";
    this.listaAtributos['orden'] = "Orden";
    this.listaAtributos['facturacion'] = "Facturacion";
    this.titulo = $titulo;
    this.mostrarSpinner = true;
    this.httpService.obtenerDatos(url).subscribe(res => {
      this.mostrarSpinner = false;
      let auxLista = JSON.parse(res);
      if (auxLista[2]) {
        auxLista.forEach(element => {
          listaAMostrar.push({ "mesa": element.mesa, "orden": element.orden, "facturacion": element.facturacion });

        });
        this.listaInforme = listaAMostrar;
      }
      else {
        this.listaInforme.push(auxLista);
      }
      this.cargarDatosExcel(this.listaInforme, $titulo);

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
    this.mostrarSpinner = true;
    this.httpService.obtenerDatos(url).subscribe(res => {
      this.mostrarSpinner = false;
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
      this.cargarDatosExcel(this.listaInforme, $titulo);

    });
  }
  reiniciarListasInformes() {
    this.listaAtributos = [];
    this.listaInforme = [];
    this.listaInformeEncuestas = [];
  }

}
