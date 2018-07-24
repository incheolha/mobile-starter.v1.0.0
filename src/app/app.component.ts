import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { timer } from 'rxjs/observable/timer';

import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  showSplash = true;

  public pages = [
    {
      title: 'Home',
      icon: 'ios-home-outline',
      count: 0,
      component: HomePage
    }
  ]

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.rootPage = WelcomePage;
      statusBar.styleDefault();
      splashScreen.hide();
      timer(3000).subscribe(() => this.showSplash = false)
    });
  }
}

