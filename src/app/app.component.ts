import { Component, ViewChild } from '@angular/core';
import { Platform, ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { SplashPage } from '../pages/splash/splash';
import { menuPages } from './globalMenuPageSetting/globalMenuSetting';
import { Page } from './globalMenuPageSetting/page.model';
@Component({
  templateUrl: 'app.html',
  queries: {
    nav: new ViewChild('content')
  }
})

export class MyApp {

  rootPage:string;
  public nav: any;

  public pages = menuPages;


  constructor(platform: Platform,
              statusBar: StatusBar,
              modalController: ModalController) {

      platform.ready().then(() => {
                  this.rootPage = 'WelcomePage';                   //lazy loading 기법 채용
                  statusBar.styleDefault();
                  let splash = modalController.create(SplashPage);
                  splash.present();
                });
  }

  openPage(page: Page) {

    this.nav.push(page.component);
    
  }

  openProfile() {
    this.nav.push('UserProfilePage');
  }
}

