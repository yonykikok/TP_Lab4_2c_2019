import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/clases/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged: any = false;
  constructor(private angularFireAuth: AngularFireAuth) {
    angularFireAuth.authState.subscribe(user => (this.isLogged = user));
  }


  //LOGIN
  async onLgin(user: User) {
    try {
      return await this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    } catch (error) {
      console.log("ERROR al logear");
    }
  }
  //REGISTER
  async onRegister(user: User) {
    try {
      return await this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.email);
    } catch (error) {
      console.log("ERROR al registrar");
    }
  }
}
