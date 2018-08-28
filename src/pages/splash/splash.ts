import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { timer } from 'rxjs/observable/timer';
/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  constructor(public navCtrl: NavController,
              public viewController: ViewController,
              public splashScreen: SplashScreen,
              public navParams: NavParams) {
  }

  ionViewDidEnter() {
    this.splashScreen.hide();
    timer(6000).subscribe(() => {
      this.viewController.dismiss();
    });

  }

}
