import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../clases/usuario';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  onLogin(usuario: Usuario) {
    let myHeaders = new HttpHeaders();
    myHeaders.set("Access-Control-Allow-Origin", "*");
    return this.httpClient.post<any>("http://localhost:80/template/auth/login",JSON.stringify(usuario), { headers: myHeaders }).pipe(
      res => res
    );
  }
  getInfoByToken(token) {
    let myHeaders = new HttpHeaders();
    myHeaders.set("Access-Control-Allow-Origin", "*");
    return this.httpClient.get<any>("http://localhost:80/template/auth/getInfoByToken"+JSON.stringify(token), { headers: myHeaders }).pipe(
      res => res
    );
  }
  onRegister(usuario) 
  {
    let myHeaders = new HttpHeaders();
    myHeaders.set("Access-Control-Allow-Origin", "*");
    return this.httpClient.post<any>("http://localhost:80/template/auth/register", JSON.stringify(usuario), { headers: myHeaders }).pipe(
      res => res
    );
  }
  





  getAll() {
    let myHeaders = new HttpHeaders();
    myHeaders.set("Access-Control-Allow-Origin", "*");
    return this.httpClient.get<any[]>("http://localhost:80/template/MostrarMenu", { headers: myHeaders }).pipe(
      res => res
    );
  }
  getById(id) {
    let myHeaders = new HttpHeaders();
    myHeaders.set("Access-Control-Allow-Origin", "*");
    return this.httpClient.get<any>("http://localhost:80/template/Usuario/" + id, { headers: myHeaders });
  }
  insertUser(user) {
    let myHeaders = new HttpHeaders();
    myHeaders.set("Access-Control-Allow-Origin", "*");
    return this.httpClient.post<Usuario>("http://localhost:80/template/Usuario/", user, { headers: myHeaders }).pipe(
      res => res
    );
  }

  updateUser(user) {
    let myHeaders = new HttpHeaders();
    myHeaders.set("Access-Control-Allow-Origin", "*");
    return this.httpClient.post<Usuario>("http://localhost:80/template/Usuario/" + user.id, user, { headers: myHeaders }).pipe(
      res => res
    );
  }

  deleteUser(id) {
    let myHeaders = new HttpHeaders();
    myHeaders.set("Success-Control-Allow-Origin", "*");
    return this.httpClient.delete<Usuario>("http://localhost:80/template/Usuario/" + id, { headers: myHeaders }).pipe(
      res => res
    );
  }
}
