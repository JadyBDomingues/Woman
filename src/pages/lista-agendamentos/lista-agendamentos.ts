import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Agendamento } from '../../modelos/agendamento';
import { AgendamentoDaoProvider } from '../../providers/agendamento-dao/agendamento-dao';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';

/**
 Criando minha tela de Lista Agendamentos
 */

@IonicPage()
@Component({
  selector: 'page-lista-agendamentos',
  templateUrl: 'lista-agendamentos.html',
})
export class ListaAgendamentosPage {
  agendamentos: Agendamento[];
  private _alerta;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _alertCtrl: AlertController,
              private _agendamentosService: AgendamentosServiceProvider,
              private _agendamentoDao: AgendamentoDaoProvider,) {
  }

  ionViewDidLoad() {    /*incluindo uma listagem de agendamentos */
    this._agendamentoDao.listaTodos()
        .subscribe(
          (agendamentos: Agendamento[]) => {
            this.agendamentos = agendamentos;
          }
        )  
  }

  reenvia(agendamento: Agendamento){  /* criando a funcao de reenviar pelo botao/seta criado acima */
      this._alerta = this._alertCtrl.create({
        title: 'Aviso',
        buttons: [
          {
            text: 'Ok',
          }
        ]
      });
  
      let mensagem = '';
  
    this._agendamentosService.agenda(agendamento)
      .mergeMap((valor) => {            /* concatena os dados do agendamento se e duplicad ou nao */
  
        let observable = this._agendamentoDao.salva(agendamento);
        if(valor instanceof Error){    /* verificando instancia rxjs */
          throw valor;
        }
        return observable;
      })
      .finally(
        () => {
          this._alerta.setSubTitle(mensagem);
          this._alerta.present();
        }
      )
      .subscribe(
        () => mensagem = 'Agendamento reenviado!',     /* callback sucesso */
        (err: Error) => mensagem = err.message         /*callback d falha*/
      );
    }
  }
