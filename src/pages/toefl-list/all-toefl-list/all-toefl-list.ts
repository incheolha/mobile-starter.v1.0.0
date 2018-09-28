import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-all-toefl-list',
  templateUrl: 'all-toefl-list.html',
})
export class AllToeflListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllToeflListPage');
  }

}
