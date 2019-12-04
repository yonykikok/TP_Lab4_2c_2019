import { Component, OnInit } from '@angular/core';
import { UsuarioActualService } from 'src/app/servicios/usuario-actual.service';
import { User } from 'src/app/clases/user';
import { Usuario } from 'src/app/clases/usuario';
import { HttpService } from 'src/app/servicios/http.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  mostrarDialog: boolean = false;
  constructor(private usuarioActualService: UsuarioActualService, private httpService: HttpService) { }
  usuario = this.usuarioActualService.usuario;
  ngOnInit() {
    this.httpService.obtenerMesasACerrar().subscribe(res => {
      console.info(res);
    });
  }


  showDialog() {
    this.mostrarDialog = true;
  }
}
