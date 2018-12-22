import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Toefl } from '../../model/toefl.model';


@Component({
  selector: 'page-basic-toefl-list',
  templateUrl: 'basic-toefl-list.html',
})
export class BasicToeflListPage {

  basicToefls: Toefl[] = [];

  public slides = [
    { src: 'assets/imgs/slide_1.jpg'},
    { src: 'assets/imgs/slide_2.jpg'},
    { src: 'assets/imgs/slide_3.jpg'}
 ];
 
  constructor(public navCtrl: NavController, public navParams: NavParams)
              {
                console.log(this.navParams.data);
                this.basicToefls = this.navParams.data;
              }
}
