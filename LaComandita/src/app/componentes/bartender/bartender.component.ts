import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { HttpService } from 'src/app/servicios/http.service';

@Component({
  selector: 'app-bartender',
  templateUrl: './bartender.component.html',
  styleUrls: ['./bartender.component.css']
})
export class BartenderComponent implements OnInit {
  list1: any[];
  list2: any[];
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getAll().subscribe(res => {
      console.log(res['bebidas'][0].id);
      this.list1 = res['bebidas'];
      this.list2=[];
    });
  }

}
