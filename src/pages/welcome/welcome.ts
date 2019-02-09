import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Subscription } from 'rxjs/Subscription';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToeflListServiceProvider } from '../../providers/toefl-list-service/toefl-list-service';

import { User } from '../model/auth-model/user.model';
import { Toefl } from '../model/toefl-model/toefl.model';
import { SocalLoginServiceProvider } from '../../providers/socal-login-service/socal-login-service';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage implements OnInit, OnDestroy {

  toeflLists: Toefl[] = [];
  currentLoginUser: User;
  toeflListsSub: Subscription;

  constructor(public navCtrl: NavController,
              private authService: AuthServiceProvider,
              private toeflListsService: ToeflListServiceProvider,
              private socialLoginservice: SocalLoginServiceProvider,
              private storage: Storage ) {}

  ngOnInit(): void {


    this.toeflListsService.getAllToeflLists();

    // cache 서비스를 사용하려면 반드시 toefl list가 updated가 되고난 후에 promise 방식으로 정보를 가지고 와야한다.
    this.toeflListsSub = this.toeflListsService.postToeflListsListener().subscribe( (updatedToeflLists) => {

                                this.toeflLists = updatedToeflLists;     // cache에 저장된 정보를 가져온다

                                this.storage.get('authStatus').then( authStatus => {
                                                  if (authStatus) {
                                                    console.log(authStatus);
                                                    this.authService.isAuthenticated = true;
                                                  }
                                                });

                                this.storage.get('token').then( token => {
                                                  if (token) {
                                                        this.authService.getCurrentUser(token).subscribe( (result) => {
                                                                                                            console.log(result);
                                                                                                            this.currentLoginUser = result.user;
                                                                                                            this.moveHomePage();
                                                                                                          },
                                                                                                            (error) => console.log(error)                              // 나중에 이 error는 alert로 처리한다
                                                                                                        );
                                                    }
                                                  });

    })

  }

  skipLoginPage() {
                    this.authService.isAuthenticated = false;
                    this.moveHomePage();
  }

  login() {
    console.log(this.toeflLists);
    this.navCtrl.push('LoginPage', {originalToefls: this.toeflLists});
  }

  register() {
    this.navCtrl.push('SignUpPage', {originalToefls: this.toeflLists});
  }

  loginWithGoogle() {
    this.socialLoginservice.googleLogin().then((result) => {
                console.log('result', JSON.stringify(result));
                console.log( result.accessToken);
                console.log( result.email);
                console.log( result.displayName);
                console.log( result.userId);
                console.log( result.givenName);
                console.log( result.imageUrl);
      }).catch((err) => {
            console.log( '에러 발생 지역', err );
      });
  }
  moveHomePage() {
    this.navCtrl.setRoot('HomePage', { currentLoginedUser: this.currentLoginUser, allToefls: this.toeflLists });
  }

  ngOnDestroy() {
    this.toeflListsSub.unsubscribe();
  }

}
