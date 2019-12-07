import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appToggleBotonConfirmar]'
})
export class ToggleBotonConfirmarDirective {

  @Input('appToggleBotonConfirmar') mesa: any;

  constructor(private el: ElementRef) {
    setTimeout(() => {
      console.log("mesa: " + this.mesa);
      if (!this.mesa) {
        this.el.nativeElement.innerHTML = "Seleccionar una mesa";
        this.el.nativeElement.style.background = "lightgreen";
        this.el.nativeElement.style.color = "black";
      }
      else {
        this.el.nativeElement.innerHTML = "Confirmar pedido";
      }
    }, 30);
  }


}
