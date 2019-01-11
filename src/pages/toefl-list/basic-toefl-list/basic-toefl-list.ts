import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Toefl } from '../../model/toefl-model/toefl.model';


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
 
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController){
                console.log(this.navParams.data);
                this.basicToefls = this.navParams.data; }

  onToeflDetail(toeflItem) {
                console.log('click toefl detail..', toeflItem)
                let toeflDetail = this.modalCtrl.create('ToeflDetailPage', { toeflItem: toeflItem })
                toeflDetail.present();
  }
            
}
