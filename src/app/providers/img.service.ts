import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';

@Injectable({
  providedIn: 'root'
})
export class ImgService implements OnInit {

  public dataImgur : BehaviorSubject<any>;
  public tagImg;

  constructor(public http   : HttpClient) { }

  ngOnInit(){
    this.getAlbum()
  }

  getAlbum(){
    let headerOptions = new HttpHeaders().set('Authorization', 'Client id here');
    this.http.get('https://api.imgur.com/3/album/' + 'album id here', 
    { headers: headerOptions }
    ).subscribe(data =>
      {
        this.dataImgur = new BehaviorSubject<any>(data);
        this.dataImgur = new BehaviorSubject<any>(this.dataImgur.value.data);
      },
      (error : any) =>
      {
        console.log(error);
      });
    }

  getData() : Observable<any>{
    //console.log(this.dataImgur);
    return this.dataImgur;
  }
}
