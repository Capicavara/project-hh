import { Injectable, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { map, first } from 'rxjs/operators';
import { Observable } from "rxjs"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
 
@Injectable({
  providedIn: 'root'
})

export class DataserviceService {
  @ViewChild('h1')
  h1: ElementRef;
  redirectUrl: string;
  user: string;
  imgdata;
  sum = 100;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';
  modalOpen = false;
  public alerta: boolean = false;
  public alertaTexto;
  public simpleObservable = new Observable((observer) => {
    
    // observable execution
    observer.next(this.user);
    observer.complete();
})
  baseUrl:string = "";
@Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor(private httpClient : HttpClient) { }
  public userlogin(username, password) {
    return this.httpClient.post<any>(this.baseUrl + '/login.php', { username, password })
        .pipe(map(Usermodule => {
            this.setToken(Usermodule[0].nick);
            //console.log(this.getToken);
            this.getToken();

            this.getLoggedInName.emit(true);
            return Usermodule;
        }));
}
public userregistration(name,email,pwd) {
  return this.httpClient.post<any>(this.baseUrl + '/registration.php', { name,email, pwd })
      .pipe(map(Usermodule => {
          return Usermodule;
      }));
}

public mysqlimg(type,id,user,tags,link) {
 return this.httpClient.post<any>('', { type, id, user, tags, link })
      .pipe(map(data => {
        //console.log(data);
          return data;
      }));
}

public onScrollDown (ev) {
  console.log('scrolled down!!', ev);

  // add another 20 items
  const start = this.sum;
  this.sum += 20;
  //this.appendItems(start, this.sum);
  
  this.direction = 'down'
}

public onUp(ev) {
  console.log('scrolled up!', ev);
  const start = this.sum;
  this.sum += 20;
  //this.prependItems(start, this.sum);

  this.direction = 'up';
}

scrollToTop() {
  this.h1.nativeElement.scrollIntoView({ behavior: 'smooth' });
}

public getmysql(username, password) {
  return this.httpClient.post<any>(', { username, password })
      .pipe(map(data => {
          //console.log(data);
          return data;
      }));
}
public getuser(username, password) {
  return this.httpClient.post<any>('', { username, password })
      .pipe(map(data => {
          //console.log(data);
          return data;
      }));
}
public getdata(){
  this.getuser(this.getToken(),'')
  .pipe(first())
  .subscribe(
      data => {
            //console.log(data);
            this.imgdata = data;
            return this.imgdata;
      },
      error => {
          console.log(error);
      });
}
//token
setToken(token: string) {
  localStorage.setItem('token', token);
}



getToken() {
  return localStorage.getItem('token');
}
 
deleteToken() {
  localStorage.removeItem('token');
}

alertaController(text) {
  this.alerta = !this.alerta;
  this.alertaTexto = text;
}

deleteImage(id) {
  let headerOptions = new HttpHeaders().set('Authorization', '');
  let dados;
  let status;
  let options = { headers: headerOptions };
  console.log('https://api.imgur.com/3/image/' + id);
  this.httpClient.delete('https://api.imgur.com/3/image/' + id, options).subscribe(data => {
    //console.log(data);
    dados = data;
    if (dados.success == true) {
      this.alertaController('Imagem excluída com sucesso!');
      this.mysqlimg('delete', id, "no", "no", "no")
    .pipe(first())
    .subscribe(
        data => {
          console.log(data);
          this.scrollToTop();
        },
        error => {
          console.log(error)
        });
    }
    else {
      this.alertaController('Falha ao excluir dados! ' + dados.success);
    }
  });
}
 
isLoggedIn() {
  const usertoken = this.getToken();
  if (usertoken != null) {
    return true
  }
  return false;
}
 
}
 
