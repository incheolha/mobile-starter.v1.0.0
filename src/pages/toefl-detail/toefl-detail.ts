import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Toefl } from '../model/toefl-model/toefl.model';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the ToeflDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-toefl-detail',
  templateUrl: 'toefl-detail.html',
})
export class ToeflDetailPage {

  toeflItem: Toefl;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private authService: AuthServiceProvider) {
              this.toeflItem = this.navParams.data.toeflItem; 
              console.log('인증 확인 모드', this.authService.isAuthenticated);
            }

 
  addCart() {
    console.log('cart was tapped', this.toeflItem);

  if(this.authService.isAuthenticated) {
      let toast = this.toastCtrl.create(
        {
          message: 'An item is added into cart',
          duration: 500,
          position: 'bottom',
          cssClass: 'customToast'    // 사용자 정의용 이므로 app.scss에 규정되어 있음
                                    // 반드시 app.css에 설정을 해야함
        })
      toast.present();
  } else {
    this.navCtrl.push('LoginPage');
  }

  }
 buy() {
  console.log('buy was tapped', this.toeflItem);

 }
}
