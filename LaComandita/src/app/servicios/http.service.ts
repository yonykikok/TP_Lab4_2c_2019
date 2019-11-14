import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../clases/usuario';
import { UsuarioActualService } from './usuario-actual.service';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient, private usuarioActualService: UsuarioActualService) { }

  tomarPedido(pedido: string) {
    let myHeaders = new HttpHeaders();
    myHeaders = myHeaders.set("Access-Control-Allow-Origin", "*");
    myHeaders = myHeaders.append("token", this.usuarioActualService.token);
    console.info(myHeaders);
    return this.httpClient.post<any>("http://u698144487.hostingerapp.com/Mozo/TomarPedido", pedido, { headers: myHeaders }).pipe(
      res => res
    );
  }
  onLogin(usuario: Usuario) {
    let myHeaders = new HttpHeaders();
    myHeaders.set("Access-Control-Allow-Origin", "*");
    return this.httpClient.post<any>("http://u698144487.hostingerapp.com/auth/login", JSON.stringify(usuario), { headers: myHeaders }).pipe(
      res => res
    );
  }
  getInfoByToken(token) {
    let myHeaders = new HttpHeaders();
    myHeaders.set("Access-Control-Allow-Origin", "*");
    return this.httpClient.get<any>("http://u698144487.hostingerapp.com/auth/getInfoByToken" + JSON.stringify(token), { headers: myHeaders }).pipe(
      res => res
    );
  }
  onRegister(usuario) {
    let myHeaders = new HttpHeaders();
    myHeaders.set("Access-Control-Allow-Origin", "*");
    return this.httpClient.post<any>("http://u698144487.hostingerapp.com/auth/register", JSON.stringify(usuario), { headers: myHeaders }).pipe(
      res => res
    );
  }
  getAll() {
    let myHeaders = new HttpHeaders();
    myHeaders.set("Access-Control-Allow-Origin", "*");
    return this.httpClient.get<any[]>("http://u698144487.hostingerapp.com/MostrarMenu", { headers: myHeaders }).pipe(
      res => res
    );
  }
  getById(id) {
    let myHeaders = new HttpHeaders();
    myHeaders.set("Access-Control-Allow-Origin", "*");
    return this.httpClient.get<any>("http://u698144487.hostingerapp.com/Usuario/" + id, { headers: myHeaders });
  }
  // http://u698144487.hostingerapp.com
  // TomarPedido(pedido) {
  //   let myHeaders = new HttpHeaders();
  //   myHeaders.set("Access-Control-Allow-Origin", "*");
  //   return this.httpClient.post<Usuario>("http://u698144487.hostingerapp.com/Usuario/", pedido, { headers: myHeaders }).pipe(
  //     res => res
  //   );
  // }
  insertUser(user) {
    let myHeaders = new HttpHeaders();
    myHeaders.set("Access-Control-Allow-Origin", "*");
    return this.httpClient.post<Usuario>("http://u698144487.hostingerapp.com/Usuario/", user, { headers: myHeaders }).pipe(
      res => res
    );
  }

  updateUser(user) {
    let myHeaders = new HttpHeaders();
    myHeaders.set("Access-Control-Allow-Origin", "*");
    return this.httpClient.post<Usuario>("http://u698144487.hostingerapp.com/Usuario/" + user.id, user, { headers: myHeaders }).pipe(
      res => res
    );
  }

  deleteUser(id) {
    let myHeaders = new HttpHeaders();
    myHeaders.set("Success-Control-Allow-Origin", "*");
    return this.httpClient.delete<Usuario>("http://u698144487.hostingerapp.com/Usuario/" + id, { headers: myHeaders }).pipe(
      res => res
    );
  }
}
