import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/clases/user';
import { HttpService } from 'src/app/servicios/http.service';
import { UsuarioActualService } from 'src/app/servicios/usuario-actual.service';
import { Usuario } from 'src/app/clases/usuario';
import { RouterLink, Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();
  formLogin: FormGroup;
  intentosCaptcha = 0;
  mostrarAccesoRapido: boolean = false;
  invalidUser: boolean = false;
  login: boolean = true;
  register: boolean = false;
  captcha: boolean = false;
  errorCaptcha: boolean = false;

  token: string;
  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private router: Router,
    private usuarioActualService: UsuarioActualService, private messageService: MessageService) {
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
    this.httpService.onLogin(this.usuario).subscribe(res => {
      if (res == "invalid nombre/clave") {
        this.invalidUser = true;
      }
      else {
        this.invalidUser = false;
        this.token = res;
        sessionStorage.setItem('token', res);
        this.cargarTokenYRole(res);
        this.usuarioActualService.usuario = this.usuario;
        // this.usuarioActualService.usuario.role='cliente';//HARDCODEO
        this.usuarioActualService.token = this.token;
        this.router.navigateByUrl('/Principal');
      }
    });
  }
  onRegister($event) {
    if ($event) {
      this.intentosCaptcha = 0;
      this.captcha = false;
      this.usuario.nombre = this.formLogin.value.nombre;
      this.usuario.clave = this.formLogin.value.clave;
      this.usuario.role = "cliente";


      this.httpService.onRegister(this.usuario).subscribe(res => {
        if (res == "usuario existente") {
          this.showWarning();
        }
        else {
          this.cargarTokenYRole(res);
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
    else {
      this.intentosCaptcha++;
      if (this.intentosCaptcha > 3) {
        this.errorCaptcha = true;
        setTimeout(() => {
          this.router.navigateByUrl('/home');
          this.errorCaptcha = false;
        }, 3000);
      }
    }

  }
  cargarUsuario($event) {
    if ($event.path[0].title != "") {
      this.usuario.nombre = $event.path[0].title.toLowerCase();
      this.usuario.clave = $event.path[0].title.toLowerCase();
    }
    else {
      this.usuario.nombre = $event.path[1].title.toLowerCase();
      this.usuario.clave = $event.path[1].title.toLowerCase();
    }
  }
  verificarCaptcha() {
    this.captcha = true;
  }

  showSuccess() {
    this.messageService.add({ key: 'success', severity: 'success', summary: 'Summary Text', detail: 'Detail Text' });
  }
  showWarning() {
    this.messageService.add({ key: 'alreadyExist', severity: 'warn', summary: 'El usuario ya existe', detail: 'escoja otro nombre de usuario' });
  }
}
