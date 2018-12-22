import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Toefl } from '../../model/toefl.model';


@Component({
  selector: 'page-beginner-toefl-list',
  templateUrl: 'beginner-toefl-list.html',
})
export class BeginnerToeflListPage {

  beginnerToefls: Toefl[] = [];


  public slides = [
    { src: 'assets/imgs/slide_1.jpg'},
    { src: 'assets/imgs/slide_2.jpg'},
    { src: 'assets/imgs/slide_3.jpg'}
 ];
 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
                 console.log(this.navParams.data);
                 this.beginnerToefls = this.navParams.data;
  }

}
