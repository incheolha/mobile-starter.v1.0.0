import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToeflListServiceProvider } from '../../providers/toefl-list-service/toefl-list-service';
import { LoginPage } from '../auth/login/login';
import { Toefl } from '../model/toefl.model';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  toeflLists: Toefl[] = [];
  beginnerToeflLists: Toefl[] = [];
  basicToeflLists: Toefl[] = [];
  interToeflLists: Toefl[] = [];
  advToeflLists: Toefl[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toeflExamService: ToeflListServiceProvider) {

                this.toeflExamService.getAllToeflLists().subscribe( data => {
                  console.log( data.toefls );
                  this.toeflLists = data.toefls;

                })
  }

  login() {

    this.navCtrl.push('LoginPage', {allToefl: this.toeflLists});
  }

  register() {
    this.navCtrl.setRoot('HomePage', this.toeflLists);
  }

}
