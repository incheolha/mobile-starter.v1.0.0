import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Toefl } from '../model/toefl-model/toefl.model';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { User } from '../model/auth-model/user.model';
import { ToeflListServiceProvider } from '../../providers/toefl-list-service/toefl-list-service';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage implements OnInit {

  toeflLists: Toefl[] = [];
  currentLoginUser: User;
  toeflListsSub: Subscription;

  constructor(public navCtrl: NavController,
              private authService: AuthServiceProvider,
              private toeflListsService: ToeflListServiceProvider,
              private storage: Storage ) {}

  ngOnInit(): void {


    this.storage.get('toeflLists').then( data => {
      console.log( data );

      if (data) {
        this.toeflLists =  data;
        this.toeflListsService.toeflListChanged.next(this.toeflLists);
      } else {
        this.toeflListsService.getAllToeflLists()
                              .subscribe((postToefls) => {
                                this.toeflLists = postToefls.toefls;
                                console.log(this.toeflLists);
                                this.toeflListsService.toeflListChanged.next(this.toeflLists);
                                this.storage.set('toeflLists', this.toeflLists);
                              },
                                ( error ) => console.log(error)
                              );
      }
      });

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


  moveHomePage() {

    this.navCtrl.setRoot('HomePage', { currentLoginedUser: this.currentLoginUser, allToefls: this.toeflLists });
  }


}
