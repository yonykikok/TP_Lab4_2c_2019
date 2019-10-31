import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioActualService {
  token:string;
  usuario:Usuario
  constructor() { }
}
