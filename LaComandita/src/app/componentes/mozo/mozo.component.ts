import { Component, OnInit, ɵConsole } from '@angular/core';
import { HttpService } from 'src/app/servicios/http.service';
import { UsuarioActualService } from 'src/app/servicios/usuario-actual.service';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { Pedido } from 'src/app/clases/pedido';
import { ThrowStmt } from '@angular/compiler';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mozo',
  templateUrl: './mozo.component.html',
  styleUrls: ['./mozo.component.css']
})
export class MozoComponent implements OnInit {
  checkedListos: boolean = true;
  checkedPendientes: boolean = true;
  checkedACobrar: boolean = true;
  mostrarSpinner: boolean = false;
  usuario = this.usuarioActualService.usuario;
  mostrarIconoDeDetalle: boolean = true;
  pedidos: Pedido[] = [];
  pedidosAMostrar: Pedido[] = [];
  contador: number = 0;
  pedidoActual: Pedido = new Pedido();
  mostrarPedidosAConfirmar: boolean = false;
  checkedComidas: boolean;
  checkedBebidas: boolean;
  checkedTragos: boolean;
  checkedPostres: boolean;
  pedidosListos: Pedido[] = [];
  pedidosACobrar: any[] = [];

  constructor(private usuarioActualService: UsuarioActualService,
    private pedidosSercice: PedidosService,
    private httpService: HttpService,
    private messageService: MessageService) { }

  ngOnInit() {
    let pedidos = JSON.parse(localStorage.getItem('pedidos'));
    this.pedidos = pedidos;
    this.cargarPedidosListos();
    this.cargarPedidosACobrar();
    this.toglePendientes();
  }
  cargarPedidosACobrar() {
    this.pedidosACobrar = [];
    let lista = localStorage.getItem("pedidosACobrar");
    if (lista && lista.length > 0) {
      JSON.parse(lista).forEach(element => {
        if (!element.cobrado) {
          this.pedidosACobrar.push(element);
        }
      });
    }
  }
  entregarPedido($pedido) {
    this.mostrarSpinner = true;
    this.httpService.ServirPedido($pedido).subscribe(res => {
      this.mostrarSpinner = false;
      if (res == "todo ok") {
        this.cargarPedidosListos();
        this.mensajePedidoEntregado();
      }
    });
  }
  mensajePedidoEntregado() {
    this.messageService.add({ severity: 'success', key: "entregarPedido", summary: 'Pedido entregado', detail: 'El cliente te informara cuando necesite la cuenta.' });
  }

  cobrarPedido($pedido) {
    this.mostrarSpinner = true;
    this.httpService.cobrarPedido($pedido).subscribe(res => {
      this.mostrarSpinner = false;
      if (res.toString() == "todo ok") {
        let lista = JSON.parse(localStorage.getItem("pedidosACobrar"));
        if (lista && lista.length > 0) {
          lista.forEach(element => {
            if (element.mesa == $pedido.mesa && element.orden == $pedido.orden) {
              element.cobrado = true;
            }
            localStorage.setItem('pedidosACobrar', JSON.stringify(lista));
            this.pedidosSercice.pedidosACobrar = lista;
            this.cargarPedidosACobrar();
            this.mensajeCobrarPedido();
          });
        }
      }
    });
  }
  mensajeCobrarPedido() {
    this.messageService.add({ severity: 'success', key: "cobrado", summary: 'Pedido Cobrado', detail: "Se habilito la encuesta para el cliente." });
  }
  verListaDePedidos() {
    this.mostrarPedidosAConfirmar = true;
  }
  leerPedido($pedido) {
    //$pedido.estado = "leido";
    this.pedidoActual = $pedido;
    if ($pedido.bebidas.length > 0) {
      this.checkedBebidas = true;
    }
    else if ($pedido.bebidas.length == 0) {
      this.checkedBebidas = false;
    }

    if ($pedido.comidas.length > 0) {
      this.checkedComidas = true;
    }
    else if ($pedido.comidas.length == 0) {
      this.checkedComidas = false;
    }

    if ($pedido.tragos.length > 0) {
      this.checkedTragos = true;
    }
    else if ($pedido.tragos.length == 0) {
      this.checkedTragos = false;
    }

    if ($pedido.postres.length > 0) {
      this.checkedPostres = true;
    }
    else if ($pedido.postres.length == 0) {
      this.checkedPostres = false;
    }
  }


  pedidoToString(pedido) {
    if (pedido.length == 0) {
      return "{}";
    }
    let stringOrden = "";
    let stringIds = "";
    let stringCantides = "";
    let contador = 0;
    pedido.forEach(orden => {
      if (contador == 0) {
        stringIds += orden.id;
        stringCantides += orden.cantidad;
        contador++;
      }
      else {
        stringIds += "," + orden.id;
        stringCantides += "," + orden.cantidad;
      }
    });
    return stringOrden += '{"id":"' + stringIds + '","cantidad":"' + stringCantides + '"}';
  }

  ConfirmarOrden($pedido) {
    $pedido.estado = "confirmado";
    let pedido = "{";
    let comidas = '"comidas":' + this.pedidoToString($pedido.comidas);
    let bebidas = '"bebidas":' + this.pedidoToString($pedido.bebidas);
    let tragos = '"tragos":' + this.pedidoToString($pedido.tragos);
    let postres = '"postres":' + this.pedidoToString($pedido.postres);
    let mesa = '"mesa":{"asientos":"' + $pedido.mesa.asientos + '",	"ubicacion":"' + $pedido.mesa.ubicacion + '"}';
    let cliente = '"cliente":{"nombre":"' + $pedido.cliente.nombre + '"}';
    let token = '"token":{"token":"' + this.usuarioActualService.token + '"}';
    pedido += comidas + "," + bebidas + "," + tragos + "," + postres + "," + mesa + "," + cliente + "," + token + "}";
    console.info(pedido);
    this.mostrarSpinner = true;
    this.httpService.tomarPedido(pedido).subscribe(res => {
      this.mostrarSpinner = false;
      console.info(res);
      this.actualizarLocalStorage($pedido);
      this.showInfo();
    });
    this.toglePendientes();
  }
  showInfo() {
    this.messageService.add({ severity: 'success', key: "ordenConfirmada", summary: 'Orden confirmada', detail: 'Ahora los empleados lo podran ver' });
  }
  actualizarLocalStorage(pedido) {
    let lista = JSON.parse(localStorage.getItem('pedidos'));
    if (lista) {
      lista.forEach(element => {
        console.info(pedido.estado);
        if (pedido['cliente'].nombre == element['cliente'].nombre) {
          element.estado = pedido.estado;
        }
      });
      localStorage.setItem('pedidos', JSON.stringify(lista));
    }
  }
  RechazarOrden($pedido) {
    let auxPedidos = [];
    this.pedidos.forEach(pedido => {
      if (pedido != $pedido) {
        auxPedidos.push(pedido);
      }
    });
    this.pedidos = auxPedidos;
    this.pedidosSercice.pedidos = auxPedidos;
  }
  toglePendientes() {
    let auxPedidos = [];
    if (this.pedidos) {

      if (this.checkedPendientes) {
        this.pedidos.forEach(element => {
          if (element.estado != 'confirmado') {
            auxPedidos.push(element);
          }
        });

      } else {
        this.pedidos.forEach(element => {
          if (element.estado == 'confirmado') {
            auxPedidos.push(element);
          }
        });
      }
      this.pedidosAMostrar = auxPedidos;
    }
  }
  cargarPedidosListos() {
    this.mostrarSpinner = true;
    this.httpService.obtenerTodosLosPedidos('Mozo').subscribe(res => {
      this.mostrarSpinner = false;
      let pedidos = JSON.parse(res.toString());
      if (pedidos) {
        this.pedidosListos = pedidos;
      }
    });
  }
}
