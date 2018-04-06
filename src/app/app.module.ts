import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '@angular/common/http';
import { ServicoServiceProvider } from '../providers/servico-service/servico-service';
import { AgendamentosServiceProvider } from '../providers/agendamentos-service/agendamentos-service';
/*import { EscolhaPage } from '../pages/escolha/escolha'; */

import 'rxjs/add/operator/finally';   
import { IonicStorageModule } from '@ionic/storage';
import 'rxjs/add/operator/do'; 
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import { AgendamentoDaoProvider } from '../providers/agendamento-dao/agendamento-dao';
import { LoginPage } from '../pages/login/login';
import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';


@NgModule({
  declarations: [ /* sempre irei incluir o nome da nova pagina que crio */
    MyApp,
    HomePage,
    LoginPage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'woman',    
      storeName: 'agendamentos',
      driverOrder: ['indexeddb']
    })
  ],
  bootstrap: [IonicApp],    /* sempre irei incluir o nome da nova pagina que crio */
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicoServiceProvider,
    AgendamentosServiceProvider,
    AgendamentoDaoProvider,
    UsuariosServiceProvider       /* nome do meu servico que criei providers > servicoServiveProvider */
  ]
})
export class AppModule {}
