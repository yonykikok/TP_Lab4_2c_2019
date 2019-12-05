import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field-set-toggle',
  templateUrl: './field-set-toggle.component.html',
  styleUrls: ['./field-set-toggle.component.css']
})
export class FieldSetToggleComponent implements OnInit {
  @Input() titulo = "Comentario";
  @Input() encuesta;
  @Input() informacion = "ComentarioComentarioComentarioComentario";

  constructor() { }

  ngOnInit() {
  }

}
