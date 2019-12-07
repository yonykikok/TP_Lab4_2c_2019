import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseStorageService } from 'src/app/servicios/firebase-storage.service';
@Component({
  selector: 'app-subidor-de-imagenes',
  templateUrl: './subidor-de-imagenes.component.html',
  styleUrls: ['./subidor-de-imagenes.component.css']
})
export class SubidorDeImagenesComponent implements OnInit {

  uploadedFiles: any[] = [];



  constructor(
    private firebaseStorage: FirebaseStorageService
  ) { }

  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });
  public mensajeArchivo = '';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;
  public referencia: any;
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
    let archivo = this.datosFormulario.get('archivo');
    this.referencia = this.firebaseStorage.referenciaCloudStorage(this.nombreArchivo);
    let tarea = this.firebaseStorage.tareaCloudStorage(this.nombreArchivo, archivo);
    console.info("ASDASD");
    //Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje == 100) {
        this.finalizado = true;
      }
    });


  }
  ngOnInit() {
  }

  obtenerUrlPublica() {
    if (this.referencia) {
      this.referencia.getDownloadURL().subscribe((URL) => {
        this.URLPublica = URL;
      });
    }
  }
}
