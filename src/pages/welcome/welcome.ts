import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Toefl } from '../model/toefl-model/toefl.model';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage implements OnInit {

  toeflLists: Toefl[] = [];

  constructor(public navCtrl: NavController,
              private authService: AuthServiceProvider,
              private storage: Storage ) {}

  ngOnInit(): void {

    this.storage.ready().then(()=> {
      this.storage.get('toeflLists').then( data => {
        console.log('저장소로 부터 추출한 토플리스트: ', data);
        this.toeflLists =  data;
      })
    })
  }

  skipLoginPage() {
    this.authService.isAuthenticated = false;
    this.authService.authChange.next(false);
    this.moveHomePage();
  }
  login() {
    this.navCtrl.push('LoginPage', {originalToefls: this.toeflLists});
  }

  register() {
    this.navCtrl.push('SignUpPage', {originalToefls: this.toeflLists});
  }


  moveHomePage() {
    const currentGuest = null;
    this.navCtrl.setRoot('HomePage', {
                                      currentLoginedUser: currentGuest,
                                      allToefls: this.toeflLists});
  }

}
