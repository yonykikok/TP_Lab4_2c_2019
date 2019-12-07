import { Directive, ElementRef, Renderer, Input } from '@angular/core';
import { Pedido } from 'src/app/clases/pedido';
@Directive({
  selector: '[appEstadoPedido]'
})
export class EstadoPedidoDirective {
  @Input('appEstadoPedido') estado: string;

  constructor(private el: ElementRef) {
    setTimeout(() => {

      console.log("estado: " + this.estado);
      if (this.estado.includes("pendiente")) {
        this.el.nativeElement.innerHTML = "Preparar Pedido";
      }
      else if (this.estado.includes("en preparacion")) {
        this.el.nativeElement.innerHTML = "Terminar Pedido";
      }
      else if (this.estado.includes("listo para servir")) {

        this.el.nativeElement.innerHTML = "✔️";
      }
    }, 30);
  }

}
