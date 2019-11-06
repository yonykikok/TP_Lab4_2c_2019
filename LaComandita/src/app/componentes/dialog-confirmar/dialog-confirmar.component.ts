import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-confirmar',
  templateUrl: './dialog-confirmar.component.html',
  styleUrls: ['./dialog-confirmar.component.css']
})
export class DialogConfirmarComponent implements OnInit {

  @Output() eventCancelar: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() eventConfirmar: EventEmitter<boolean> = new EventEmitter<boolean>()
  constructor() { }
  @Input() mensaje: string;
  ngOnInit() {
  }
  cancelar() {
    this.eventCancelar.emit();
  }
  confirmar() {
    this.eventConfirmar.emit();
  }
}
