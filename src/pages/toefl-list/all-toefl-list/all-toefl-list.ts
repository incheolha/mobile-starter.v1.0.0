import { Toefl } from '../../model/toefl-model/toefl.model';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthServiceProvider } from '../../../providers/auth-service/auth-service';
import { UtiltiyServiceProvider } from '../../../providers/utiltiy-service/utiltiy-service';
import { Shoppingcart } from '../../model/payment-model/shoppingcart.model';
import { ShoppingCartServiceProvider } from '../../../providers/shopping-cart-service/shopping-cart-service';
import { ToeflListServiceProvider } from '../../../providers/toefl-list-service/toefl-list-service';

@Component({
  selector: 'page-all-toefl-list',
  templateUrl: 'all-toefl-list.html',
})
export class AllToeflListPage {

  allToefls: Toefl[] = [];
  isAuth: boolean;

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
              private toeflListsService: ToeflListServiceProvider,
              private shoppingCartService: ShoppingCartServiceProvider,
              private utilityService: UtiltiyServiceProvider) {

              console.log(this.navParams.data);
              this.allToefls = this.navParams.data;
              this.isAuth = this.authService.isAuthenticated;

    this.shoppingCartLists = this.shoppingCartService.getShoppingCartLists();


  }

  onToeflDetail(toeflItem) {
    console.log('click toefl detail..', toeflItem)

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

invalidatedCache() {
  this.toeflListsService.cacheInvalidateService();
}

forceReload(refrescher) {
  this.toeflListsService.forceToReresher(refrescher);
}
}
