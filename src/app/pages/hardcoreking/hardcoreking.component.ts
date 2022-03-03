import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ImgService } from 'src/app/providers/img.service';
import { FormBuilder, FormGroup } from '@angular/forms';

/* {
    "access_token": "2f533c52133d0405738068ae6a23feca6a1646d7",
    "expires_in": 315360000,
    "token_type": "bearer",
    "scope": "",
    "refresh_token": "4abb503830c11b470b418faf5baf7e8a0eaaf28b",
    "account_id": 72279675,
    "account_username": "Sporedragon"
} 
{
    "data": {
        "id": "Vvwleyr",
        "deletehash": "Q5Bwof1tzS4bffR"
    },
    "success": true,
    "status": 200
}
*/

@Component({
  selector: 'ons-page',
  templateUrl: './hardcoreking.component.html',
  styleUrls: ['./hardcoreking.component.scss']
})
export class HardcorekingComponent implements OnInit {
  public tags;
  public dados;
  public tagedit: Text;
  public res: string;
  public tagImg
  public Titulo;
  public load: boolean;
  public titleImg;
  public fileType;
  constructor(public http: HttpClient, private router: Router, public imgService: ImgService) { }

  ngOnInit() {
    this.getJson();
  }


  getJson() {
    this.imgService.getData().subscribe(data => {
      this.dados = data;
      this.dados = this.dados.images
      console.log(this.dados);
      console.log("teste");
    });
    //this.dados = this.imgService.dataImgur;

    //console.log('foi');
  }

  onFileChanged(event) {
    const file = event.target.files[0]
    this.titleImg = file.name;
    let reader = new FileReader();
    let result;
    reader.readAsDataURL(file);
    //console.log(reader.result);
    reader.onload = (event: any) => {
      //me.modelvalue = reader.result;
      this.res = event.target.result;
      //console.log(reader.result);
      result = this.res;
      this.res = result.toString();
      console.log(file.type);
      /*       if (file.type == "image/png") {
              this.fileType = "png";
            }
            else {
              this.fileType = "jpg";
            } */
      this.res = result.replace('data:' + file.type + ';base64,', '');
    };

    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }

  sendImage(file) {
    console.log(file);
    let headerOptions = new HttpHeaders().set('Content-Type', 'multipart/form-data').append('Authorization', 'Client-ID 1f1b3c20a38b1e5');
    const body = new HttpParams({
      fromObject: {
        image: file,
        album: 'Q5Bwof1tzS4bffR',
        type: 'base64',
        title: this.Titulo,
        description: this.tagImg
      }
    });
    const HttpUploadOptions = {
      headers: new HttpHeaders({ "Authorization": "Client-ID 1f1b3c20a38b1e5" })
    }
    const formData = new FormData();
    formData.append('image', file);
    formData.append('album', 'Q5Bwof1tzS4bffR');
    formData.append('type', 'base64');
    formData.append('title', this.Titulo);
    formData.append('description', this.tagImg);
    console.log(formData);
    this.load = true;
    this.http.post('https://api.imgur.com/3/image',
      formData,
      HttpUploadOptions
    ).subscribe(data => {
      this.tags = data;
      console.log(file);
      console.log(this.tags);
      this.load = false;
    },
      (error: any) => {
        console.log(error);
      });

  }

  getJsonTags(id) {
    let headerOptions = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post('http://www.garrysmod.com.br/php/hentai/getjsontags.php',
      { 'tagimg': id },
      { headers: headerOptions }
    ).subscribe(data => {
      this.tags = data;
      console.log(id);
      console.log(this.tags);
    },
      (error: any) => {
        console.log(error);
      });

  }

  salvarJson(i, v, id, t) {
    let headerOptions = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post('http://www.garrysmod.com.br/php/hentai/salvarjson.php',
      { 'i': i, 'v': v, 'id': id, 'tipo': t },
      { headers: headerOptions }
    ).subscribe(data => {
      console.log(data);
    },
      (error: any) => {
        console.log(error);
      });
    this.router.navigated = false;
    this.router.navigateByUrl('/tabs', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/hardcoreking']);
    });
  }

  salvarimagem(i, v, id, t) {
    let headerOptions = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post('http://www.garrysmod.com.br/php/hentai/salvarjson.php',
      { 'i': i, 'v': v, 'id': id, 'tipo': t },
      { headers: headerOptions }
    ).subscribe(data => {
      console.log(data);
    },
      (error: any) => {
        console.log(error);
      });
    this.router.navigated = false;
    this.router.navigateByUrl('/tabs', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/hardcoreking']);
    });
  }

  createAlbum() {
    let headerOptions = new HttpHeaders().set('Authorization', 'Client-ID 1f1b3c20a38b1e5');
    console.log(headerOptions);
    this.http.post('https://api.imgur.com/3/album/j6IsHgL/',
      { headers: headerOptions }
    ).subscribe(data => {
      console.log(data);
    },
      (error: any) => {
        console.log(error);
      });

  }

  testar(i, v, id) {
    console.log(i + ' ' + v + ' ' + id);
  }

}
