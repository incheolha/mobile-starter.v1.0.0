import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Platform, ModalController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';

import { SplashPage } from '../pages/splash/splash';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../pages/model/auth-model/user.model';

import { Toefl } from '../pages/model/toefl-model/toefl.model';
import { ShoppingCartServiceProvider } from '../providers/shopping-cart-service/shopping-cart-service';
import { ToeflListServiceProvider } from '../providers/toefl-list-service/toefl-list-service';

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
  private toeflListsSub: Subscription;

  toeflLists: Toefl[] = [];

  currentUserName: string = '';
  currentUserEmail: string = '';
  currentUser: User;
  currentAuthStatus: boolean;

  constructor(platform: Platform,
              statusBar: StatusBar,
              modalController: ModalController,
              private storage: Storage,
              private authService: AuthServiceProvider,
              private toeflListsService: ToeflListServiceProvider,
              private screenOrientation: ScreenOrientation,
              private shoppingCartService: ShoppingCartServiceProvider) {

      platform.ready().then(() => {
                  this.rootPage = 'WelcomePage';             //lazy loading 기법 채용
                  statusBar.styleDefault();
                  console.log(this.screenOrientation.type);
                  this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT); //스크린 방향을 protrait로 고정한다
                  let splash = modalController.create(SplashPage);

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

    // 사용자가 로그인후 인증상태 변화를 updated해준다
    this.authStatusSub = this.authService.authChangeListener()
                                          .subscribe( (authStatus: boolean) => {
                                            console.log('app main에서 변화되는 subject', authStatus);
                                            this.currentAuthStatus = authStatus;

                                          });
    //사용자가 인증후 사용자 프로파일에서 사용할 정보를 update한다
    this.loginedUserSub = this.authService.loginedUserListener()
                                          .subscribe( (loginedUser: User) => {

                                            console.log(loginedUser);
                                            this.currentUser = loginedUser;

                                            if (!loginedUser) {
                                              this.currentUserName = 'Guest';
                                              this.currentUserEmail = 'Not Available';
                                            } else {
                                              this.currentUserName = loginedUser.name;
                                              this.currentUserEmail = loginedUser.email;
                                            }
                                          });

    this.toeflListsSub = this.toeflListsService.postToeflListsListener()
                                               .subscribe( (postedToeflLists: Toefl[]) => {
                                                 console.log( postedToeflLists );
                                                 this.toeflLists = postedToeflLists;
                                               } )

  }
  openProfile() {
    console.log('open profile clicked');
    console.log(this.currentUser);
    this.nav.push('UserProfilePage', {currentUser: this.currentUser,
                                      currentAuthStatus: this.currentAuthStatus
                                      });
  }

  goBackHome() {
      this.nav.setRoot('HomePage', {currentLoginedUser: this.currentUser, allToefls: this.toeflLists});

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
    this.storage.ready().then( () => {
      this.storage.clear().then( () => {
        console.log( '저장소가 청소되었습니다..')
      })
    })
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
    this.toeflListsSub.unsubscribe();
  }

}
