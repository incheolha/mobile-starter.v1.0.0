import { Component } from '@angular/core';
import { Platform, ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { timer } from 'rxjs/observable/timer';

import { SplashPage } from '../pages/splash/splash';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:string;


  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              modalController: ModalController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.rootPage = 'WelcomePage';
      statusBar.styleDefault();
       // splashScreen.hide();
      let splash = modalController.create(SplashPage);
      splash.present();
    });
  }
}

