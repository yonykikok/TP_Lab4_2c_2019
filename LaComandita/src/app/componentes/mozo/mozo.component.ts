import { Component, OnInit, ɵConsole } from '@angular/core';
import { HttpService } from 'src/app/servicios/http.service';
import { UsuarioActualService } from 'src/app/servicios/usuario-actual.service';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { Pedido } from 'src/app/clases/pedido';

@Component({
  selector: 'app-mozo',
  templateUrl: './mozo.component.html',
  styleUrls: ['./mozo.component.css']
})
export class MozoComponent implements OnInit {
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
  checkedPendientes: boolean = true;
  pedidosListos: Pedido[] = [];
  pedidosACobrar: any[] = [];

  constructor(private usuarioActualService: UsuarioActualService,
    private pedidosSercice: PedidosService,
    private httpService: HttpService) { }


  // botonTest() {
  //   this.httpService.tomarPedido('{"comidas":{"id":"2","cantidad":"1"},"bebidas":{"id":"2","cantidad":"3"},"tragos":{"id":"5","cantidad":"1"},"postres":{"id":"6","cantidad":"1"},"mesa":{"asientos":"1",	"ubicacion":"interior"},"cliente":{"nombre":"mozo"},"token":{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NzQ5ODAyNDIsImV4cCI6MTU3NTA0MDI0MiwiYXVkIjoiMDZlOTM1YTRlODI2ZDY4Yzk3NDgzM2UzNmZiOTc5NzEzOGZiZWVhNCIsImRhdGEiOnsiaWQiOjEwLCJub21icmUiOiJtb3pvIiwicm9sZSI6Im1vem8ifSwiYXBwIjoiQXBpIFJlc3QgSGFlZG8gSm9uYXRoYW4ifQ.pf613BdTAD73AvjVERPvFHqJi61hxx6AMzKVsEXNW9U"}}').subscribe(res => {
  //     console.log(res);
  //   })
  // }

  ngOnInit() {
    let pedidos = JSON.parse(localStorage.getItem('pedidos'));
    // this.pedidos = this.pedidosSercice.pedidos;
    this.pedidos = pedidos;
    this.cargarPedidosListos();
    this.cargarPedidosACobrar();
  }
  cargarPedidosACobrar() {
    let lista = JSON.parse(localStorage.getItem("pedidosACobrar"));
    if (lista.length > 0) {
      this.pedidosACobrar = lista;
    }
  }
  entregarPedido($pedido) {
    this.httpService.ServirPedido($pedido).subscribe(res => {
      if (res == "todo ok") {
        this.cargarPedidosListos();
      }
    });
  }
  cobrarPedido($pedido) {
    this.httpService.cobrarPedido($pedido).subscribe(res => {
      if (res.toString() == "todo ok") {
        console.log("CHETO!! VA BIEN");
        //VERIFICAR QUE NO INTENTE COBRAR 2 VECES EL MISMO PEDIDO.

      }
    });
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
    this.httpService.tomarPedido(pedido).subscribe(res => {
      console.info(res);
      this.actualizarLocalStorage($pedido);
    });
    this.toglePendientes();
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
    this.httpService.obtenerTodosLosPedidos('Mozo').subscribe(res => {
      let pedidos = JSON.parse(res.toString());
      if (pedidos) {
        this.pedidosListos = pedidos;
      }
    });
  }
}
