import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/internal/Observable';

interface User {
  uid: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;
  loginFail = false;
  
constructor(private router: Router,
  private angularFireAuth: AngularFireAuth) { 
    this.user = this.angularFireAuth.authState;
  }

  login(email: string, password: string) {
    this.angularFireAuth
    .auth
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      this.loginFail = false;
      console.log('Successfully signed in!');
      this.router.navigate(['/allcards']);
    })
    .catch(err => {
      this.loginFail = true;
      console.log('Something is wrong:',err.message);
    });
  }

  logout() {                       
    this.angularFireAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
}
