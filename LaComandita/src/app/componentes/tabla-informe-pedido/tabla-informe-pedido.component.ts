import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabla-informe-pedido',
  templateUrl: './tabla-informe-pedido.component.html',
  styleUrls: ['./tabla-informe-pedido.component.css']
})
export class TablaInformePedidoComponent implements OnInit {


  constructor() { }
  @Input() sector: string;
  @Input() lista: any[];
  ngOnInit() {
  }
}
