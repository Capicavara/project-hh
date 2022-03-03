import { Component, OnInit } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { LoginService } from 'src/app/providers/login.service';
import { DataserviceService } from 'src/app/providers/dataservice.service';

@Component({
  selector: 'ons-page',
  templateUrl: './tab2.component.html',
  styleUrls: ['./tab2.component.scss']
})

export class Tab2Component implements OnInit {
  nick: string;
  senha: string;
  user: SocialUser;
  loggedIn: boolean;
  constructor(public loginpage: LoginService, public dataService: DataserviceService) { }

  ngOnInit() {
    this.loggedIn = this.loginpage.loggedIn;
    this.senha = this.loginpage.senha;
    this.nick = this.loginpage.nick;
    this.user = this.loginpage.user;
    this.loginpage.subscribe();
    this.loginpage.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      //console.log(this.user);
    });
  }

}

