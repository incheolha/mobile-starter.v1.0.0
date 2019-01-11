import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Platform, ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { SplashPage } from '../pages/splash/splash';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../pages/model/auth-model/user.model';
import { ToeflListServiceProvider } from '../providers/toefl-list-service/toefl-list-service';
import { Toefl } from '../pages/model/toefl-model/toefl.model';

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
              private toeflListsService: ToeflListServiceProvider) {

      platform.ready().then(() => {
                  this.rootPage = 'WelcomePage';                   //lazy loading 기법 채용
                  statusBar.styleDefault();
                  let splash = modalController.create(SplashPage);
                  splash.present();
                });

  }


  ngOnInit() {


    this.authStatusSub = this.authService.authChangeListener()
                                          .subscribe( (authStatus: boolean) => {
                                            console.log('app main에서 변화되는 subject', authStatus);
                                            this.currentAuthStatus = authStatus;
                                            if(!this.currentAuthStatus) {
                                              this.currentUserName = 'Guest';
                                              this.currentUserEmail = 'Not Available'
                                            }
                                          });
    this.loginedUserSub = this.authService.loginedUserListener()
                                          .subscribe( (loginedUser: User) => {
                                            this.currentUser = loginedUser;
                                            this.currentUserName = loginedUser.name;
                                            if(!this.currentUserName) {
                                              this.currentUserName = 'Guest';
                                            }
                                            this.currentUserEmail = loginedUser.email;
                                            if(!this.currentUserEmail) {
                                              this.currentUserEmail = 'Not Available';
                                            }
                                          })
    this.toeflListsSub = this.toeflListsService.postToeflListsListener()
                                                .subscribe( (toeflLists: Toefl[]) => {
                                                  console.log( toeflLists );
                                                  this.toeflLists = toeflLists;

                                                  if ( this.toeflLists.length !== 0 ) {
                                                    for ( let toeflItem of this.toeflLists ) {
                                                      if (toeflItem.toeflLevel === 'Beginner') {
                                                            this.beginnerToeflLists.push(toeflItem);
                                                      } else if (toeflItem. toeflLevel === 'Basic') {
                                                            this.basicToeflLists.push(toeflItem)
                                                      } else if (toeflItem.toeflLevel === 'InterMediate') {
                                                            this.interToeflLists.push(toeflItem)
                                                      } else if (toeflItem.toeflLevel === 'Advanced') {
                                                            this.advToeflLists.push(toeflItem)
                                                      }
                                                    }
                                                  }

                                                })

  }
  openProfile() {
    console.log('open profile clicked');

    this.nav.push('UserProfilePage', {currentUser: this.currentUser,
                                      currentAuthStatus: this.currentAuthStatus
                                      });
  }

  goBackHome() {

    this.nav.setRoot('HomePage', {allToefls: this.toeflLists,
      beginnerToeflLists: this.beginnerToeflLists,
      basicToeflLists: this.basicToeflLists,
      interToeflLists: this.interToeflLists,
      advToeflLists: this.advToeflLists});

  }

  doLogin() {
    this.nav.push('LoginPage', {originalToefls: this.toeflLists});
  }

  doSignUp() {
    this.nav.push('SignUpPage', {originalToefls: this.toeflLists});
  }

  doLogout() {
    this.authService.isAuthenticated = false;
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