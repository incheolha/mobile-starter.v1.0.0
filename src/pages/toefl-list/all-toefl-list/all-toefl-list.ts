import { Toefl } from './../../model/toefl.model';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-all-toefl-list',
  templateUrl: 'all-toefl-list.html',
})
export class AllToeflListPage {

  allToefls: Toefl[] = [];

  public slides = [
    { src: 'assets/imgs/slide_1.jpg'},
    { src: 'assets/imgs/slide_2.jpg'},
    { src: 'assets/imgs/slide_3.jpg'}
 ];

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

              console.log(this.navParams.data);
              this.allToefls = this.navParams.data;

  }



}
