import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { LoginService } from 'src/app/providers/login.service';

@Component({
  selector: 'ons-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  nick: string;
  senha: string;
  user: SocialUser;
  loggedIn: boolean;

  constructor(private authService: AuthService, public login: LoginService) { }

  signInWithFB(): void {
    this.login.signInWithFB();
  }

  signOut(): void {
    this.login.signOut();
  }

  ngOnInit() {
    this.login.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      //console.log(this.user);
    });
  }

}
