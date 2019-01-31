
import { Injectable } from '@angular/core';
import { Shoppingcart } from '../../pages/model/payment-model/shoppingcart.model';
import { UtiltiyServiceProvider } from '../utiltiy-service/utiltiy-service';

@Injectable()
export class ShoppingCartServiceProvider {

  shoppingCartLists: Shoppingcart[] = [];

  constructor(public utilityService: UtiltiyServiceProvider) {}

  initializeShoppingCartLists() {
                                return this.shoppingCartLists = [];
  }
  getShoppingCartLists() {
                                return this.shoppingCartLists;
  }

  addShoppingCartList( newShoppingCartItem: Shoppingcart) {

    const findShoppingItem = this.shoppingCartLists.filter( (shoppingCart: Shoppingcart) => {
                   return shoppingCart.examNo === newShoppingCartItem.examNo; });

    if (findShoppingItem.length === 0) {

          this.shoppingCartLists.push(newShoppingCartItem);

          const msg = '선택하신 회차가 장바구니에 담겼습니다.';
          const timeLenth = '1000';
          const location = 'bottom';
          const cssClassName = 'successToast';
          this.utilityService.customToast(msg, timeLenth, location, cssClassName);  // cssClassName위치는 app.scss
                                                                                    // 내에 존재한다.
    } else {
          const msg = '선택하신 시험이 이미 장바구니에 있습니다.';
          const timeLenth = '1000';
          const location = 'bottom';
          const cssClassName = 'errorToast';
          this.utilityService.customToast(msg, timeLenth, location, cssClassName);
    }

  }

}
