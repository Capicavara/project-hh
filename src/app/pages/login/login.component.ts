import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/app/providers/dataservice.service';
 
@Component({
  selector: 'ons-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  nick: string;
  senha: string;
  user: string;
  loggedIn: boolean;
  imgurData;
  tagsImg;
  constructor(private fb: FormBuilder,public dataService: DataserviceService,private router:Router) {
    this.user = this.dataService.getToken();
    this.angForm = this.fb.group({
 
      email: ['', [Validators.required,Validators.minLength(1)]],
      password: ['', Validators.required]
 
    });
   }
 teste(){
   console.log(this.loggedIn);
 }
  ngOnInit() {
    this.getimg();
  }
  getimg(){
    this.dataService.getuser(this.dataService.getToken(),'')
    .pipe(first())
    .subscribe(
        data => {
              //console.log(data);
              this.imgurData = data;
                let ids = [];
                this.tagsImg = [];
                var re = /#/gi;
                let stringe: string;
                this.imgurData.forEach(element => {
                  stringe = element.tags;
                  stringe = stringe.replace(re, '');
                  var splitted = stringe.split(" ");
                  this.tagsImg.push(splitted);
                  ids.push(element.id);
                });
            
                //console.log(this.tagsImg);
        },
        error => {
            console.log(error);
        });
  }
  logout() {
  this.user == undefined;
  this.dataService.deleteToken();
  window.location.href = window.location.href;
}
  postdata(angForm1)
  {
    this.dataService.userlogin(angForm1.value.email,angForm1.value.password)
      .pipe(first())
      .subscribe(
          data => {
                const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/tabs';
                this.router.navigate([redirect]);
          },
          error => {
              alert("Nome ou senha incorreta")
          });
  }
  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }
}