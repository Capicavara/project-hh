import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) { }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }


  title = 'hardcore';
  user: SocialUser;
  loggedIn: boolean;
  ngOnInit() {
    // ANCHOR Página Raiz
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      //console.log(this.user);
    });
    this.router.navigate(['/tabs'], { replaceUrl: true })
  }
}


