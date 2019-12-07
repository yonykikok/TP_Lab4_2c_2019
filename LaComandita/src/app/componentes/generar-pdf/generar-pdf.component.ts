import { Component, OnInit, Input } from '@angular/core';
import * as XLSX from 'xlsx';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-generar-pdf',
  templateUrl: './generar-pdf.component.html',
  styleUrls: ['./generar-pdf.component.css']
})
export class GenerarPdfComponent implements OnInit {

  @Input() lista: any[];;
  datosAImprimir: any[] = [];
  atributos: any;
  @Input() nameOfFile: string;
  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }
  generarExcel() {

    if (this.lista && this.lista.length > 0) {

      this.atributos = Object.keys(this.lista[0]);

      this.datosAImprimir = [];
      let auxLista: any[] = [];
      this.datosAImprimir.push(this.atributos);//Agrego la cabezera al excel

      this.lista.forEach(element => {//recorro cada elemento de la lista
        auxLista = [];
        this.atributos.forEach(atributo => {//recorro los atributos 
          auxLista.push(element["" + atributo + ""]);//con esto genero una row en el excel para luego añadirlo
        });
        this.datosAImprimir.push(auxLista);//añado la row al excel
      });
      const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.datosAImprimir);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Prueba");

      XLSX.writeFile(wb, this.nameOfFile + '.xlsx');

    }
    else {
      this.showInfo();
    }
  }
  showInfo() {
    this.messageService.add({ severity: 'info', key: "listaVacia", summary: 'Lista sin datos', detail: 'No se puede descargar el archivo excel, si no hay datos' });
  }
}
