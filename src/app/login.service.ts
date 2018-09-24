import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {OptionInterface} from './option';
import {AuthService, GoogleLoginProvider} from 'angular-6-social-login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn = false;
  constructor() {}

  signIn(): boolean {
    return this.isLoggedIn = true;
  }

  signOut(): boolean {
    return this.isLoggedIn = false;
  }

  get isAuth() {
    return this.isLoggedIn;
  }
}
