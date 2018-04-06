import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Servico } from '../../modelos/servico';
import { Mais } from '../../modelos/mais';
import { CadastroPage } from '../cadastro/cadastro';

/**
 * Minha nova telinha que vai redirecionar para a escolha do meu serviço
 */

@IonicPage()
@Component({
  selector: 'page-escolha',
  templateUrl: 'escolha.html',
})
export class EscolhaPage {

  public servico: Servico;
  public mais: Mais[];     /*  na minha lista de mais virou um array*/
  private _precoTotal: number;   /*  criando um metodo privado para calcular o preco total so vou acessar ele de um compomente*/
  
  constructor(public navCtrl: NavController,  /*  componente do ionic resp pelas navegações de telas/pagi*/
              public navParams: NavParams) {

              this.servico = this.navParams.get('servicoSelecionado');
              this._precoTotal = this.servico.preco;
              this.mais = [
                { nome: 'Corte de Cabelo', preco: 80},
                { nome: 'Escova', preco: 100},
                { nome: 'Chapinha', preco: 100}
              ];
  }

 /* ionViewDidLoad() {     não estou utilizando o Escolha page tem a page 
    console.log('ionViewDidLoad EscolhaPage');
  } */

  atualizaTotal(ativado:boolean, mais: Mais){   /*verificação se meu toggle esta ativado e valor = calculo */
    ativado ?
    this._precoTotal += mais.preco:
    this._precoTotal -= mais.preco;
  }

  avancaCadastro() {
    console.log('passou1');
    this.navCtrl.push(CadastroPage.name, {
      servicoSelecionado: this.servico,
      precoTotal: this._precoTotal
    });
  }

  get precoTotal(){   /*para acessar do meu tamplete */
    return this._precoTotal;
  }
}
