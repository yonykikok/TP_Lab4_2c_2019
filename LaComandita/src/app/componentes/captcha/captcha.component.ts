import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {

  constructor() { }
  selectedValue: number;
  opciones: number[];
  numeroSecreto: number;
  respuesta: number;
  @Output() eventResultadoCaptcha: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() mostrarCaptcha: boolean;
  @Input() mostrarError: boolean;
  
  ngOnInit() {
    this.actualizar();
  }

  actualizar() {
    this.opciones = [];
    for (let i = 0; i < 3; i++) {
      this.opciones.push(Math.floor(Math.random() * (100 - 0) + 0));
    }
    this.numeroSecreto = Math.floor(Math.random() * (100 - 0) + 0);
  }
  verificar() {
    this.calcularRespuesta();
    if (this.calcularRespuesta() == this.selectedValue) {
      console.log("Captcha Pasado");
      this.eventResultadoCaptcha.emit(true);
    }
    else {
      console.info("sos boludo o sos un robot");
      this.actualizar();
      this.eventResultadoCaptcha.emit(false);

    }
  }
  calcularRespuesta() {
    let diferencias = [];
    let numeroMasCercano = 999;
    this.opciones.forEach(opcion => {
      let resultado = this.numeroSecreto - opcion;
      if (resultado < 0) {
        resultado = resultado * (-1);
      }
      diferencias.push(resultado);

    });

    for (let i = 0; i < 3; i++) {
      if (diferencias[i] < numeroMasCercano) {
        numeroMasCercano = diferencias[i];
        this.respuesta = i;
      }
    }
    return this.opciones[this.respuesta];
  }

}
