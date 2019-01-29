import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Platform, ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { SplashPage } from '../pages/splash/splash';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../pages/model/auth-model/user.model';

import { Toefl } from '../pages/model/toefl-model/toefl.model';
import { ShoppingCartServiceProvider } from '../providers/shopping-cart-service/shopping-cart-service';

@Component({
  templateUrl: 'app.html',
  queries: {
    nav: new ViewChild('content')
  }
})

export class MyApp implements OnInit, OnDestroy{

  public rootPage:string;
  public nav: any;

  private loginedUserSub: Subscription;
  private authStatusSub: Subscription;


  toeflLists: Toefl[] = [];
  beginnerToeflLists: Toefl[] = [];
  basicToeflLists: Toefl[] = [];
  interToeflLists: Toefl[] = [];
  advToeflLists: Toefl[] = [];

  currentUserName: string = '';
  currentUserEmail: string = '';
  currentUser: User;
  currentAuthStatus: boolean;

  constructor(platform: Platform,
              statusBar: StatusBar,
              modalController: ModalController,
              private authService: AuthServiceProvider,
              private screenOrientation: ScreenOrientation,
              private shoppingCartService: ShoppingCartServiceProvider) {

      platform.ready().then(() => {
                                    //lazy loading 기법 채용
                  statusBar.styleDefault();

                  console.log(this.screenOrientation.type);
        //          this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT); //스크린 방향을 protrait로 고정한다
                  let splash = modalController.create(SplashPage);
                  this.rootPage = 'WelcomePage';
                  splash.present();
                });

  }


  getCurrentScreenOrientation() {
    console.log(this.screenOrientation.type);
  }

  async lockScreenOrientation() {
    try {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    } catch (error) {
      console.log(error);
    }

  }

  unlockScreenOrientation() {
    this.screenOrientation.unlock();
  }

  observeScreenOrientation() {
    this.screenOrientation.onChange()
                          .subscribe(() => {
                            console.log('this application orientation has chanaged');
                          })
  }
  ngOnInit() {

    this.authStatusSub = this.authService.authChangeListener()
                                          .subscribe( (authStatus: boolean) => {
                                            console.log('app main에서 변화되는 subject', authStatus);
                                            this.currentAuthStatus = authStatus;

                                          });
    this.loginedUserSub = this.authService.loginedUserListener()
                                          .subscribe( (loginedUser: User) => {

                                            console.log(loginedUser);
                                            if (!loginedUser) {
                                              this.currentUserName = 'Guest';
                                              this.currentUserEmail = 'Not Available';
                                            } else {
                                              this.currentUserName = loginedUser.name;
                                              this.currentUserEmail = loginedUser.email;
                                            }

                                          });

  }
  openProfile() {
    console.log('open profile clicked');

    this.nav.push('UserProfilePage', {currentUser: this.currentUser,
                                      currentAuthStatus: this.currentAuthStatus
                                      });
  }

  goBackHome() {
      this.nav.setRoot('HomePage', {allToefls: this.toeflLists});

  }

  doLogin() {
    this.nav.push('LoginPage', {originalToefls: this.toeflLists});
  }

  doSignUp() {
    this.nav.push('SignUpPage', {originalToefls: this.toeflLists});
  }

  doLogout() {
    this.authService.isAuthenticated = false;
    this.shoppingCartService.shoppingCartLists = [];
    this.nav.push('WelcomePage');
  }

  doTranscript() {

  }

  doOrderHistroy() {

  }
  doShoppingCart() {

  }
  doPush() {

  }
  doContact() {

  }

  doProduct() {

  }

  doHelp() {

  }

  ngOnDestroy() {
    this.loginedUserSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
