import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Toefl } from '../../model/toefl-model/toefl.model';
import { AuthServiceProvider } from '../../../providers/auth-service/auth-service';
import { UtiltiyServiceProvider } from '../../../providers/utiltiy-service/utiltiy-service';
import { Shoppingcart } from '../../model/payment-model/shoppingcart.model';
import { ShoppingCartServiceProvider } from '../../../providers/shopping-cart-service/shopping-cart-service';

@Component({
  selector: 'page-advance-toefl-list',
  templateUrl: 'advance-toefl-list.html',
})
export class AdvanceToeflListPage {
  isAuth: boolean;
  advToefls: Toefl[] = [];


  shoppingCartLists: Shoppingcart[];
    public slides = [
      { src: 'assets/imgs/slide_1.jpg'},
      { src: 'assets/imgs/slide_2.jpg'},
      { src: 'assets/imgs/slide_3.jpg'}
   ];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              private authService: AuthServiceProvider,
              private shoppingCartService: ShoppingCartServiceProvider,
              private utilityService: UtiltiyServiceProvider) {
                console.log( this.navParams.data );
                this.advToefls = this.navParams.data;
                this.isAuth = this.authService.isAuthenticated;

    this.shoppingCartLists = this.shoppingCartService.getShoppingCartLists();

              }

  onToeflDetail(toeflItem) {
      console.log('click toefl detail..', toeflItem);

      if(this.isAuth) {
        let toeflDetail = this.modalCtrl.create('ToeflDetailPage', { toeflItem: toeflItem })
        toeflDetail.present();
      } else {
        const msg = '로그인이 필요합니다..';
        const timeLenth = '1000';
        const location = 'bottom';
        const cssClassName = 'loginErrorToast';
        this.utilityService.customToast(msg, timeLenth, location, cssClassName);

      }
  }

  goToCart() {
    console.log('tapped shopping cart..', this.shoppingCartLists);
    this.navCtrl.push('ShoppingCartPage', {shoppingCartLists: this.shoppingCartLists});
  }

}
