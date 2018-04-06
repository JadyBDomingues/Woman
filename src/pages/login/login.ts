import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { Usuario } from '../../modelos/usuario';

/**
 Ações da minha tela de Login
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email:string = 'jady@woman.com.br';
  senha:string = 'alura123';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _alertCtrl: AlertController,
              private _usuarioService: UsuariosServiceProvider) {   /** Para efetuar o metodo login   */
  }

  efetuaLogin(){             /** Para efetuar o login e não retornar a tela de login somente a Home Page  */
    console.log(this.email);
    console.log(this.senha);

    this._usuarioService               /** chamo meu servico de login com email e senha e valido se e acessivel  */
        .efetuaLogin(this.email, this.senha)
        .subscribe(
          (usuario: Usuario) => {
            console.log(usuario);
            this.navCtrl.setRoot(HomePage);
          },
          () => {
            this._alertCtrl.create({        /** No caso de erro de login  */
              title: 'Falha no login',
              subTitle:'Email ou senha incorretos! Verifique!',
              buttons: [
                { text: 'Ok'}
              ]
            }).present();
          }
        )
    
  }

}
