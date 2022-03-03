/* {
  "data": {
      "id": "n5mYUj6",
      "deletehash": "q0zK0rswdw0p0zZ"
  },
  "success": true,
  "status": 200
} */

import { element } from 'protractor';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TagsPipe } from 'src/app/filtro/tags.pipe';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ImgService } from 'src/app/providers/img.service';
import { LoginService } from 'src/app/providers/login.service';
import { SocialUser } from 'angularx-social-login';
import { DataserviceService } from 'src/app/providers/dataservice.service';
import { first } from 'rxjs/operators';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'ons-page',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.scss']
})


export class Tab1Component implements OnInit {
  nick: string;
  senha: string;
  user: SocialUser;
  loggedIn: boolean;
  public tags;
  public dados;
  public dataImgur;
  public search: boolean = false;
  public carregando: boolean = false;
  public tagsImg = [];
  public sendMenu: boolean = false;
  public tagedit: Text;
  public res: string;
  public tagImg
  public Titulo = "teste";
  public load: boolean;
  public titleImg;
  public fileType;
  public imagem;
  public alerta: boolean = false;
  public alertaUpload: boolean = false;
  public alertaTexto;
  public video;
  public tagsUpload = [];
  sum = 100;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';
  modalOpen = false;

  @ViewChild('h1')
  h1: ElementRef;

  searchText: string = "";
  constructor(public http: HttpClient, private router: Router, public imgService: ImgService, public loginpage: LoginService, public dataService: DataserviceService) { }

  ngOnInit() {
    //console.log(this.imagens[0]);

    /*       for (var i in this.imagens) // for acts as a foreach  
    {   
      for (var j in this.imagens[i].tags)
      this.tags.push([this.imagens[i].tags])
    }  
    console.log(this.tags); */
    //this.getJson();
    //this.getAlbum();
    //this.imgService.getAlbum();
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
    this.dataService.getmysql("666","666")
    .pipe(first())
    .subscribe(
        data => {
          //console.log(data);
          this.dataImgur = data;
          this.getTags();
        },
        error => {
          console.log(error);
        });
  }

  bool(b) {
    this.search = b;
  }

  onFileChanged(event) {
    this.sendMenuToggle();
    const file = event.target.files[0]
    console.log(file);
    this.titleImg = file.name;
    let reader = new FileReader();
    let result;
    this.video = file;
    if (file.type == "image/jpeg" || file.type == "image/png" || file.type =="image/gif") {
      reader.readAsDataURL(file);
      //console.log(reader.result);
      reader.onload = (event: any) => {
        //me.modelvalue = reader.result;
        this.res = event.target.result;
        this.imagem = event.target.result;
        console.log(this.imagem);
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
    else if (file.type == 'video/mp4') {
      this.alertaController('Não é possivel enviar arquivos de video!');
      this.sendMenuToggle();
    }
    else {
      this.alertaController('Formato de arquivo não suportado!');
      this.sendMenuToggle();
    }
  }

  sendImage(file) {
    console.log(file);
    let link = 'https://api.imgur.com/3/image';

    let HttpUploadOptions = {
      headers: new HttpHeaders({ "Authorization": "Bearer 2f533c52133d0405738068ae6a23feca6a1646d7" })
    }
    const formData = new FormData();
    if (this.video.type == "video/mp4") {
      console.log('video');
      link = 'https://api.imgur.com/3/image';
      formData.append('video', this.video);
    }
    else {
      console.log('imagem');
      formData.append('image', this.res);
    }
    formData.append('album', 'n5mYUj6');
    formData.append('type', 'file');
    formData.append('title', this.Titulo);
    formData.append('description', this.tagImg);
    console.log(formData);
    this.load = true;
    this.http.post(link,
      formData,
      HttpUploadOptions
    ).subscribe(data => {
      this.tags = data;
      console.log(file);
      console.log(this.tags);
      this.dataService.mysqlimg('post', this.tags.data.id, this.dataService.getToken(), this.tagImg, this.tags.data.link)
      .pipe(first())
      .subscribe(
          data => {
              console.log(data);
          },
          error => {
            console.log(error)
          });
      this.load = false;
      this.alertaUpload = true;
      //this.sendMenuToggle()
    },
      (error: any) => {
        console.log(error);
      });

  }

  pesquisa(v) {
    this.bool(false);
    console.log("valor pesuisa: " + v);
    TagsPipe.filtro(v, this.dados);
    console.log(v);
    /*     this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/tabs']);
    });  */
  }

  Filtro(pesquisa: string, tipo: string) {

  }

  getJson() {
    let headerOptions = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post('http://www.garrysmod.com.br/php/hentai/getjson.php',
      { 'tagimg': null },
      { headers: headerOptions }
    ).subscribe(data => {
      this.dados = data;
      console.log(this.dados);
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


  getTags() {
    let ids = [];
    this.tagsImg = [];
    var re = /#/gi;
    let stringe: string;
    this.dataImgur.forEach(element => {
      stringe = element.tags;
      stringe = stringe.replace(re, '');
      var splitted = stringe.split(" ");
      this.tagsImg.push(splitted);
      ids.push(element.id);
    });

    //console.log(this.tagsImg);
  }

  getAlbum() {
    let headerOptions = new HttpHeaders().set('Authorization', 'Client-ID 1f1b3c20a38b1e5');
    this.http.get('https://api.imgur.com/3/album/n5mYUj6/',
      { headers: headerOptions }
    ).subscribe(data => {
      this.dataImgur = data;
      this.dataImgur = this.dataImgur.data.images
      //console.log(this.dataImgur);
      //console.log("Pegando tags...");
      this.getTags();
      //console.log(this.tagsImg);
    },
      (error: any) => {
        console.log(error);
      });

  }

  changeUpload() {
    let tagsU = [];
    let stringe: string = this.tagImg;
    let splitt = stringe.split(" ");
    this.tagsUpload = [];
    this.tagsUpload.push(splitt);

  }

  scrollToTop() {
    this.h1.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  deleteImage(id) {
    let headerOptions = new HttpHeaders().set('Authorization', 'Bearer 2f533c52133d0405738068ae6a23feca6a1646d7');
    let dados;
    let status;
    let options = { headers: headerOptions };
    console.log('https://api.imgur.com/3/image/' + id);
    this.http.delete('https://api.imgur.com/3/image/' + id, options).subscribe(data => {
      //console.log(data);
      dados = data;
      if (dados.success == true) {
        this.alertaController('Imagem excluída com sucesso!');
        this.dataService.mysqlimg('delete', id, "no", "no", "no")
      .pipe(first())
      .subscribe(
          data => {
              console.log(data);
          },
          error => {
            console.log(error)
          });
        this.scrollToTop();
      }
      else {
        this.alertaController('Falha ao excluir dados! ' + dados.success);
        this.scrollToTop();
      }

      this.getAlbum();
    });
  }

  sendMenuToggle() {
    this.sendMenu = !this.sendMenu
  }

  alertaController(text) {
    this.alerta = !this.alerta;
    this.alertaTexto = text;
    this.scrollToTop();
  }

  DownloadProfilePic(link) {
    ;
    window.open(link);
  }

}

