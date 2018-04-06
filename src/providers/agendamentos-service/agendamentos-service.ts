import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Agendamento } from '../../modelos/agendamento';

/*
  Serviço de Agendamento encapsular todos meus agendamentos
*/
@Injectable()
export class AgendamentosServiceProvider {

  private _url = 'http://localhost:8080/api';  /*http://<ip>:8080/api/agendamento/agenda*/

  constructor(private _http: HttpClient) {
    /*console.log('Hello AgendamentosServiceProvider Provider'); */
  }

  agenda(agendamento: Agendamento){
    return this._http
                .post(this._url+'/agendamento/agenda', agendamento)
                .do(() => agendamento.enviado = true)
                .catch((err) => Observable.of(new Error('Falha no Agendamento! Tente novamente mais tarde!')));
  }

}
