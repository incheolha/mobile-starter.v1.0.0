import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Toefl } from '../model/toefl-model/toefl.model';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UtiltiyServiceProvider } from '../../providers/utiltiy-service/utiltiy-service';
import { Shoppingcart } from '../model/payment-model/shoppingcart.model';
import { ShoppingCartServiceProvider } from '../../providers/shopping-cart-service/shopping-cart-service';

/**
 * Generated class for the ToeflDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-toefl-detail',
  templateUrl: 'toefl-detail.html',
})
export class ToeflDetailPage {

  toeflItem: Toefl;
  shoppingCart: Shoppingcart;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private authService: AuthServiceProvider,
              private shoppingCartService: ShoppingCartServiceProvider) {
              this.toeflItem = this.navParams.data.toeflItem; 
              console.log('인증 확인 모드', this.authService.isAuthenticated);
            }

 
  addCart() {
    console.log('cart was tapped', this.toeflItem);

        if(this.authService.isAuthenticated) {
          const cart = new Shoppingcart(this.toeflItem.toeflNo, this.toeflItem.toeflLevel, this.price);
          this.shoppingCartService.addShoppingCartList(cart);

        } else {
          this.navCtrl.push('LoginPage');
        }

  }

 buy() {
  console.log('buy was tapped', this.toeflItem);

 }
}
