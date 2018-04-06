import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Servico } from '../../modelos/servico';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';
import { HomePage } from '../home/home';
import { Agendamento } from '../../modelos/agendamento';

import { AgendamentoDaoProvider } from '../../providers/agendamento-dao/agendamento-dao';

/**
 * Componente de Cadastro (metodos, construtores, variaveis)
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

public servico: Servico;
public precoTotal: number;

public nome: string = '';
public endereco: string = '';
public email: string ='';
public data: string = new Date().toISOString();    /* vou pegar a data atual pelo componente por isso stirng */

private _alerta: Alert;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _agendamentosService: AgendamentosServiceProvider,
    private _agendamentoDao: AgendamentoDaoProvider) {

      console.log('passou2');
      this.servico = this.navParams.get('servicoSelecionado');   /* vou pegar os dados de servico selecionado e preco usando get */
      console.log('passou3');
      this.precoTotal = this.navParams.get('precoTotal');    
      console.log('passou4');
  }

 /*ionViewDidLoad() {   não irei precisar
    console.log('ionViewDidLoad CadastroPage');
  }*/

  agenda(){    /*metodo de agenda com meu console e meus atributos */

    if (!this.nome || !this.endereco || !this.email){
      this._alertCtrl.create({
        title: 'Preenchimento obrigatório',
        subTitle: 'Preencha todos os campos!',
        buttons: [
          { text: 'Ok'}
        ]
      }).present();
    return;
    }

    let agendamento: Agendamento = {
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloServico: this.servico.nome,   /*no caso ele coloca modeloCarro carro.nome */
      precoTotal: this.precoTotal,
      confirmado: false,
      enviado: false,
      data: this.data

    };

    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]

    });

    let mensagem = '';

    this._agendamentoDao.ehDuplicado(agendamento)   /* verificando se dados sao duplicados comparando os dados ja existentes */
    .mergeMap(ehDuplicado => {
      if (ehDuplicado) {
        throw new Error('Agendamento existente!');
      }
      return this._agendamentosService.agenda(agendamento);
    })
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
      () => mensagem = 'Agendamento realizado!',     /* callback sucesso */
      (err: Error) => mensagem = err.message         /*callback d falha*/
    );
  }
}
