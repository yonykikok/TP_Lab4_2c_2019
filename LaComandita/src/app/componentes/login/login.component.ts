import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/clases/user';
import { HttpService } from 'src/app/servicios/http.service';
import { UsuarioActualService } from 'src/app/servicios/usuario-actual.service';
import { Usuario } from 'src/app/clases/usuario';
import { RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();
  formLogin: FormGroup;
  mostrarAccesoRapido: boolean = false;
  invalidUser: boolean = false;
  login: boolean = true;
  register: boolean = false;
  token: string;
  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private router: Router,
    private usuarioActualService: UsuarioActualService) {
    this.formLogin = this.formBuilder.group({
      nombre: ["", [Validators.required]],
      clave: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(15)]]
    });
  }
  toggleAcceso() {
    this.mostrarAccesoRapido = !this.mostrarAccesoRapido;
  }
  toggle() {
    this.login = !this.login;
    this.register = !this.register;
  }
  ngOnInit() {

  }
  cargarTokenYRole(response) {
    let informacion = response.split('"');
    informacion = informacion[1];//eliminamos las comillas dobles
    informacion = informacion.split(';');//separo el token y el Role del usuario logeado
    this.token = informacion[0];
    this.usuario.role = informacion[1];
  }
  onLogin() {
    this.usuario.nombre = this.formLogin.value.nombre;
    this.usuario.clave = this.formLogin.value.clave;
    // console.info(this.usuario);
    this.httpService.onLogin(this.usuario).subscribe(res => {
      if (res == "invalid nombre/clave") {
        this.invalidUser = true;
        console.info(res);
      }
      else {
        this.invalidUser = false;
        this.token = res;
        sessionStorage.setItem('token', res);
        this.cargarTokenYRole(res);
        this.usuarioActualService.usuario = this.usuario;
        this.usuarioActualService.token = this.token;
        this.router.navigateByUrl('/Principal');
      }
    });
  }
  onRegister() {
    this.usuario.nombre = this.formLogin.value.nombre;
    this.usuario.clave = this.formLogin.value.clave;
    this.usuario.role = "cliente";

    console.info(this.usuario);

    this.httpService.onRegister(this.usuario).subscribe(res => {
      this.cargarTokenYRole(res);
      console.log(this.token);
      console.log(this.usuario.role);

    });
  }
  cargarUsuario($event) {
    console.log($event.path[1].title);
    this.usuario.nombre = $event.path[1].title.toLowerCase();
    this.usuario.clave = $event.path[1].title.toLowerCase();
  }
}
