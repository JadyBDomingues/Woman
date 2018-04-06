import { Injectable } from '@angular/core';
import { Agendamento } from '../../modelos/agendamento';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

/*
  Servico no padrao DAO
*/
@Injectable()
export class AgendamentoDaoProvider {

  constructor(private _storage: Storage) {
  }

  private _geraChave(agendamento: Agendamento){
    return agendamento.emailCliente + agendamento.data.substr(0, 10);
  }

  salva(agendamento: Agendamento){
    let chave = this._geraChave(agendamento);
    let promise = this._storage.set(chave, agendamento);

    return Observable.fromPromise(promise);   /* estou indicando para salvar meus dados no indexddb */

  }

  ehDuplicado(agendamento: Agendamento){  /* esta me retornando o observable que dentro dele tem true ou false do storage */
    let chave = this._geraChave(agendamento);
    let promise = this._storage
                .get(chave)
                .then(dado => dado ? true:false);

return Observable.fromPromise(promise);
              }

  listaTodos(){
    let agendamentos: Agendamento[] = [];

    let promise = this._storage.forEach((agendamento: Agendamento) => {   /* vou*/
      agendamentos.push(agendamento);
    })
    .then(() => agendamentos);

    return Observable.fromPromise(promise);
  }
}
