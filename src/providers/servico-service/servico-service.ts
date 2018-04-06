import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Servico } from "../../modelos/servico";

/*
  Generated class for the ServicoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicoServiceProvider {

  constructor(private _http: HttpClient) {  } /*estou chamando meu metodo lista com o retorno do meu metodo get*/
  
  lista() {
    return this._http.get<Servico[]>(
      "http://localhost:8080/api/servico/listaTodos"
    );
  }
  
}
