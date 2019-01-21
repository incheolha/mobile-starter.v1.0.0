import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toefl } from '../model/toefl-model/toefl.model';
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
export class ToeflDetailPage implements OnInit {

  toeflItem: Toefl;
  shoppingCart: Shoppingcart;
  price = 10;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private shoppingCartService: ShoppingCartServiceProvider) {

            }

  ngOnInit() {
    this.toeflItem = this.navParams.data.toeflItem;
  }

  addCart() {
    console.log('cart was tapped', this.toeflItem);
          const cart = new Shoppingcart(this.toeflItem.toeflNo, this.toeflItem.toeflLevel, this.price);
          this.shoppingCartService.addShoppingCartList(cart);
          this.navCtrl.pop();
  }

 buy() {
  console.log('buy was tapped', this.toeflItem);

 }

}
