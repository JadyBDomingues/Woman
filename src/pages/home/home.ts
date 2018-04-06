import { Component } from "@angular/core";
import { NavController, LoadingController, AlertController } from "ionic-angular";
import { Servico } from "../../modelos/servico";
import { HttpErrorResponse } from "@angular/common/http";
import { ServicoServiceProvider } from "../../providers/servico-service/servico-service";
import { NavLifecycles } from "../../utills/ionic/nav/nav-lifecycles";
import { EscolhaPage } from "../escolha/escolha";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements NavLifecycles {
  public servicos: Servico[];

  constructor( public navCtrl: NavController,
               /*private _http: HttpClient, nao utilizarei mais */  
               private _loadingCtrl: LoadingController,
               private _alertCtrl: AlertController,
               private _servicoService: ServicoServiceProvider) {}
  
  ionViewDidLoad(){
    let loading = this._loadingCtrl.create({
      content: 'Aguarde Carregamento..'
    });

    loading.present();

    this._servicoService.lista()  /* estou chamando meu servicoService providers que criei*/
      .subscribe(servicos => {
        this.servicos = servicos;
        loading.dismiss();
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        
        loading.dismiss();

        this._alertCtrl.create({
          title: 'Falha na Conexão',
          subTitle: 'Não foi possivel carregar a lista. Tente novamente mais tarde',
          buttons: [
            {text: 'Ok' }
          ]
        }).present();
      }
    );

  }
  
  selecionaServico(servico: Servico){    /*criando um metodo para selecionar um servico*/
    console.log(servico);     /*chamando um console para exibir/guardar o servico que selecionei */
    this.navCtrl.push(EscolhaPage.name,{  /*push esta colocand uma tela em cima da outra como pilha eu consigo sair e voltar */
    servicoSelecionado: servico
    });
  }
}
