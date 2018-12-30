import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToeflListServiceProvider } from '../../providers/toefl-list-service/toefl-list-service';
import { Toefl } from '../model/toefl.model';
import { Subscription } from 'rxjs/Subscription';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage implements OnInit, OnDestroy {

  toeflLists: Toefl[] = [];
  postToeflListsSub: Subscription;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authService: AuthServiceProvider,
              private toeflExamService: ToeflListServiceProvider) {}

  ngOnInit(): void {
    this.toeflExamService.getAllToeflLists();

    this.postToeflListsSub = this.toeflExamService.postToeflListsListener()
                                                  .subscribe( (toefls: Toefl[] ) => {
                                                    console.log( toefls );
                                                    this.toeflLists = toefls;
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

  ngOnDestroy() {
    this.postToeflListsSub.unsubscribe();
  }


  moveHomePage() {
    const currentGuest = null;
    this.navCtrl.setRoot('HomePage', {
                                      currentLoginedUser: currentGuest,
                                      allToefls: this.toeflLists});
  }
}
