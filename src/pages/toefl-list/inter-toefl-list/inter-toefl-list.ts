import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Toefl } from '../../model/toefl.model';


@Component({
  selector: 'page-inter-toefl-list',
  templateUrl: 'inter-toefl-list.html',
})
export class InterToeflListPage {

  interToefls: Toefl[] = [];


  public slides = [
    { src: 'assets/imgs/slide_1.jpg'},
    { src: 'assets/imgs/slide_2.jpg'},
    { src: 'assets/imgs/slide_3.jpg'}
 ];
 
  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
                console.log( this.navParams.data );
                this.interToefls = this.navParams.data;
  }


}
