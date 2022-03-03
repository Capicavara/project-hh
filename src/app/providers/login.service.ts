import { Injectable, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  nick: string;
  senha: string;
  user: SocialUser;
  loggedIn: boolean;

  constructor(public authService: AuthService) { }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
    localStorage.removeItem("APP_TOKEN")
  }

  subscribe() {
    if (this.user != null) {
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
        localStorage.setItem("APP_TOKEN", user.authToken);
        //console.log(this.user);
      });
    }
  }

}
