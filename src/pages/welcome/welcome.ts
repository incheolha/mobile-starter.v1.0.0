import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToeflListServiceProvider } from '../../providers/toefl-list-service/toefl-list-service';
import { Toefl } from '../model/toefl.model';
import { Subscription } from 'rxjs/Subscription';
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage implements OnDestroy {

  toeflLists: Toefl[] = [];
  beginnerToeflLists: Toefl[] = [];
  basicToeflLists: Toefl[] = [];
  interToeflLists: Toefl[] = [];
  advToeflLists: Toefl[] = [];

  postToeflListsSub: Subscription;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toeflExamService: ToeflListServiceProvider) {

                this.toeflExamService.getAllToeflLists();

                this.postToeflListsSub = this.toeflExamService.postToeflListsListener().subscribe( (toefls: Toefl[] ) => {
                  console.log( toefls );
                  this.toeflLists = toefls;
                })
  }

  login() {
    this.navCtrl.push('LoginPage', {allToefl: this.toeflLists});
  }

  register() {
    this.navCtrl.push('SignUpPage', {allToefl: this.toeflLists});
  }

  ngOnDestroy() {
    this.postToeflListsSub.unsubscribe();
  }
}
