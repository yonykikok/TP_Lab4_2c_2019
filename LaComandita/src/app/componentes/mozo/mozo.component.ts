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
  contador: number = 0;
  pedidoActual: Pedido = new Pedido();
  mostrarPedidosAConfirmar: boolean = false;
  checkedComidas: boolean;
  checkedBebidas: boolean;
  checkedTragos: boolean;
  checkedPostres: boolean;

  constructor(private usuarioActualService: UsuarioActualService,
    private pedidosSercice: PedidosService,
    private httpService: HttpService) { }


  botonTest(){
      this.httpService.tomarPedido('{"comidas":{"id":"2","cantidad":"1"},"bebidas":{"id":"2","cantidad":"3"},"tragos":{"id":"5","cantidad":"1"},"postres":{"id":"6","cantidad":"1"},"mesa":{"asientos":"1",	"ubicacion":"interior"},"cliente":{"nombre":"mozo"},"token":{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NzQ5ODAyNDIsImV4cCI6MTU3NTA0MDI0MiwiYXVkIjoiMDZlOTM1YTRlODI2ZDY4Yzk3NDgzM2UzNmZiOTc5NzEzOGZiZWVhNCIsImRhdGEiOnsiaWQiOjEwLCJub21icmUiOiJtb3pvIiwicm9sZSI6Im1vem8ifSwiYXBwIjoiQXBpIFJlc3QgSGFlZG8gSm9uYXRoYW4ifQ.pf613BdTAD73AvjVERPvFHqJi61hxx6AMzKVsEXNW9U"}}').subscribe(res => {
        console.log(res);
      })
  }

  ngOnInit() {
    this.pedidos = this.pedidosSercice.pedidos;
    // let pedido = '{ "comidas": { "id": "1", "cantidad": "1" }, "bebidas": {}, "tragos": {}, "postres": {}, "mesa": { "asientos": "2", "ubicacion": "interior" }, "cliente": { "nombre": "mozo" } }';
    // this.httpService.tomarPedido(pedido);
    
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
    // $pedido.estado = "confirmado";
    let pedido = "{";
    let comidas = '"comidas":' + this.pedidoToString($pedido.comidas);
    let bebidas = '"bebidas":' + this.pedidoToString($pedido.bebidas);
    let tragos = '"tragos":' + this.pedidoToString($pedido.tragos);
    let postres = '"postres":' + this.pedidoToString($pedido.postres);
    let mesa = '"mesa":{"asientos":"' + $pedido.mesa.asientos + '",	"ubicacion":"' + $pedido.mesa.ubicacion + '"}';
    let cliente = '"cliente":{"nombre":"' + this.usuarioActualService.usuario.nombre + '"}';
    let token = '"token":{"token":"' + this.usuarioActualService.token + '"}';
    pedido += comidas + "," + bebidas + "," + tragos + "," + postres + "," + mesa + "," + cliente + "," + token + "}";
    console.info(pedido);
    this.httpService.tomarPedido(pedido).subscribe(res => {
      console.info(res);

    });

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
}
