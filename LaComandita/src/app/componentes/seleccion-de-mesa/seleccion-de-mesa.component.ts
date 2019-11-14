import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Mesa } from 'src/app/clases/mesa';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-seleccion-de-mesa',
  templateUrl: './seleccion-de-mesa.component.html',
  styleUrls: ['./seleccion-de-mesa.component.css']
})
export class SeleccionDeMesaComponent implements OnInit {

  @Input() mostrarSeleccionarMesa: boolean;
  @Output() eventoCambiarEstadoDeMesa: EventEmitter<Mesa> = new EventEmitter<Mesa>();


  formCantidad: FormGroup;
  @Input() mesa: Mesa;
  mesaEspecial: boolean = false;
  imagen: string = "interior";
  constructor(private formBuilder: FormBuilder) {
    this.formCantidad = this.formBuilder.group({
      cantidad: ["", [Validators.required, Validators.min(1), Validators.max(20), Validators.pattern("[0-9]*")]]
    });
  }
  ngOnInit() {
  }

  seleccionarMesa($event) {
    document.getElementById("dropdownMenuButtonMesa").textContent = $event["target"].text;
    switch ($event["target"].text) {
      case "Mesa para 2":
        this.mesa.asientos = 2;
        this.formCantidad.controls.cantidad.setValue(2);
        break;
      case "Mesa para 4":
        this.formCantidad.controls.cantidad.setValue(4);
        this.mesa.asientos = 4;
        break;
      case "Mesa para 6":
        this.formCantidad.controls.cantidad.setValue(6);
        this.mesa.asientos = 6;
        break;
      case "Mesa especial":
        this.mesaEspecial = true;
        break;
    }
  };
  seleccionarCantidad($event) {

    document.getElementById("dropdownMenuButtonCantidad").textContent = $event["target"].text;
    switch ($event["target"].text) {
      case "Interior":
        this.mesa.ubicacion = "interior";
        this.imagen = "interior";
        break;
      case "Exterior":
        this.mesa.ubicacion = "exterior";
        this.imagen = "exterior";
        break;
    }

  };
  cancelar() {
    this.mesa.asientos = 0;
    this.eventoCambiarEstadoDeMesa.emit(this.mesa);
  }
  listo() {
    this.eventoCambiarEstadoDeMesa.emit(this.mesa);
  }
}
