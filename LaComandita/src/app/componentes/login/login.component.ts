import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/clases/user';
import { HttpService } from 'src/app/servicios/http.service';
import { UsuarioActualService } from 'src/app/servicios/usuario-actual.service';
import { Usuario } from 'src/app/clases/usuario';
import { RouterLink, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FirebaseStorageService } from 'src/app/servicios/firebase-storage.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mostrarSpinner: boolean = false;
  //SUBIR IMAGENES
  uploadedFiles: any[] = [];
  public mensajeArchivo = '';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;
  public referencia: any;
  //FIN SUBIR IMAGENES
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
    private usuarioActualService: UsuarioActualService, private messageService: MessageService,
    private firebaseStorage: FirebaseStorageService) {
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
    this.mostrarSpinner = true;

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
        this.obtenerEmailPorUsuario(this.usuario.nombre);
      }
    });
  }
  obtenerEmailPorUsuario(usuario) {
    this.httpService.obtenerEmailPorUsuario(usuario).subscribe(res => {
      let auxUsuario = JSON.parse(res);
      this.usuarioActualService.usuario = auxUsuario;
      this.mostrarSpinner = false;
      this.router.navigateByUrl('/Principal');


    })
  }
  onRegister($event) {

    if ($event) {
      this.intentosCaptcha = 0;
      this.captcha = false;
      this.usuario.nombre = this.formLogin.value.nombre;
      this.usuario.clave = this.formLogin.value.clave;
      this.usuario.role = "cliente";
      this.usuario.imagen = this.URLPublica;

      this.mostrarSpinner = true;

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
          this.mostrarSpinner = false;
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


  //SUBIR IMAGENES


  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });

  //Evento que se gatilla cuando el input de tipo archivo cambia
  public cambioArchivo(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name)
      }
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }

  //Sube el archivo a Cloud Storage
  public subirArchivo() {
    this.mostrarSpinner = true;

    if (this.formLogin.value.nombre) {
      this.nombreArchivo = this.formLogin.value.nombre;
    }
    let archivo = this.datosFormulario.get('archivo');
    this.referencia = this.firebaseStorage.referenciaCloudStorage(this.nombreArchivo);
    let tarea = this.firebaseStorage.tareaCloudStorage(this.nombreArchivo, archivo);
    //Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje == 100) {
        this.finalizado = true;
        this.obtenerUrlPublica();
      }
    });


  }

  obtenerUrlPublica() {
    if (this.referencia) {

      this.referencia.getDownloadURL().subscribe((URL) => {
        this.URLPublica = URL;
        setTimeout(() => {
          this.mostrarSpinner = false;
          this.usuario.imagen = this.URLPublica;
        }, 1400);

      });
    }
  }
  //FIN SUBIR IMAGENES
}
