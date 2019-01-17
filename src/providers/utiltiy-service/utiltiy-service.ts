
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class UtiltiyServiceProvider {

  constructor(public toastCtrl: ToastController) {
    console.log('Hello UtiltiyServiceProvider Provider');
  }

  customToast( msg, timeLength, location, cssClassName) {

    let toast = this.toastCtrl.create(
      {
        message: msg,
        duration: timeLength,
        position: location,
        cssClass: cssClassName                // 사용자 정의용 이므로 app.scss에 규정되어 있음
                                              // 반드시 app.css에 설정을 해야함
      })
    toast.present();
  }

  errorToast( message, duration, color ) {

  }
}
