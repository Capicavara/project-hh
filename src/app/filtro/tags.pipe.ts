import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tags'
})
export class TagsPipe implements PipeTransform {
  public static pesquisas : string;
  public static dados;
  public static idimg : number;
  public static num : Int16Array;
  public static tipoP : string;
  public static filtro(pesquisa : string, dados){
    this.pesquisas = 'loli';
    this.dados = dados;
    this.pesquisas.toLowerCase();
/*     console.log('dado ae');
    console.log(dados); */
 }
  transform(items: any, searchText: string, a : number): any {
    if(!items) return [];
    if(!searchText) return items;
    
    searchText = searchText.toLowerCase();
        return items.filter( it => {     
            return it.tags.includes(searchText);
          //return it.tags[a].toLowerCase().includes(searchText);
        });
   } 
  }