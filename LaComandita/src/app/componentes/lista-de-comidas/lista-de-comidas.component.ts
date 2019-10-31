import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/servicios/http.service';
import { Comida } from 'src/app/clases/comida';

@Component({
  selector: 'app-lista-de-comidas',
  templateUrl: './lista-de-comidas.component.html',
  styleUrls: ['./lista-de-comidas.component.css']
})
export class ListaDeComidasComponent implements OnInit {
  @Output() eventoFinalizarPedido: EventEmitter<any> = new EventEmitter<any>();

  constructor(private httpService: HttpService) { }
  @Input() lista: any[] = new Array();
  @Input() sector: string;
  ngOnInit() {
    // console.info("ALGO",this.sector);
  }

  finalizarPedido($event) {
    let pedido=[$event,{ "sector": this.sector}];//agrego de que sector proviene el pedido
    this.eventoFinalizarPedido.emit(pedido);
  }
}
