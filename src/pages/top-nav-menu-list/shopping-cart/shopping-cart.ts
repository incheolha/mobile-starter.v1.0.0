import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { Shoppingcart } from '../../model/payment-model/shoppingcart.model';

/**

*/

@IonicPage()
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage {

  @ViewChild('slides') slides: Slides;

  shoppingCartLists: Shoppingcart[] = [];
  totalAmount = 0.00;
  activeSliderNo = 1;
  sliderConfig = {
                    spaceBetween: 10,
                    centerSlides: true,
                    slidesPerView: 1.6
  }
  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

              this.shoppingCartLists = this.navParams.data.shoppingCartLists;

              for( let item of this.shoppingCartLists) {
                this.totalAmount += item.examPrice;
              }
              console.log(this.totalAmount);
              console.log(this.shoppingCartLists);
              }

  slideChanged() {
  this.activeSliderNo = this.slides.getActiveIndex() + 1;
  console.log(this.activeSliderNo);
  }

}
