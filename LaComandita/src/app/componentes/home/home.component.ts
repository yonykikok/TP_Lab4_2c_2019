import { Component, OnInit } from '@angular/core';
import { UsuarioActualService } from 'src/app/servicios/usuario-actual.service';
import { HttpService } from 'src/app/servicios/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  images: any[];
  ngOnInit() {
    this.images = [];
    this.images.push({ source: 'assets/imagenes/comidas/6.png', alt: 'Pizza,tacos,hamburgesas y mas combos', title: 'Combo completo 1' });
    this.images.push({ source: 'assets/imagenes/comidas/5.png', alt: 'Description for Image 2', title: 'Title 2' });
    this.images.push({ source: 'assets/imagenes/comidas/3.png', alt: 'Description for Image 3', title: 'Title 3' });
  
  }

}
