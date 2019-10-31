import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabla-orden-pedido',
  templateUrl: './tabla-orden-pedido.component.html',
  styleUrls: ['./tabla-orden-pedido.component.css']
})
export class TablaOrdenPedidoComponent implements OnInit {

  constructor() { }
  @Input() sector: string;
  @Input() lista: any[];
  ngOnInit() {
  }

}
