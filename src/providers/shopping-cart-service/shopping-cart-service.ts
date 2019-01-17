
import { Injectable } from '@angular/core';
import { Shoppingcart } from '../../pages/model/payment-model/shoppingcart.model';
import { UtiltiyServiceProvider } from '../utiltiy-service/utiltiy-service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShoppingCartServiceProvider {

  shoppingCartLists: Shoppingcart[] = [];
  shoppingCartListsAdded = new Subject<Shoppingcart[]>();

  constructor(public utilityService: UtiltiyServiceProvider) {
    console.log('Hello ShoppingCartServiceProvider Provider');
  }

  shoppingCartChangedListner() {
    return this.shoppingCartListsAdded.asObservable();
  }

  addShoppingCartList( newShoppingCartItem: Shoppingcart) {

    
    const findShoppingItem = this.shoppingCartLists.filter( (shoppingCart: Shoppingcart) => {
                   return shoppingCart.examNo === newShoppingCartItem.examNo;
      } );

    if (findShoppingItem.length === 0) {
          console.log('new item listed on Shoppingcart.');
          this.shoppingCartLists.push(newShoppingCartItem);
          console.log(this.shoppingCartLists);
          const msg = '선택하신 회차가 장바구니에 담겼습니다.';
          const timeLenth = '1000';
          const location = 'bottom';
          const cssClassName = 'successToast';
          this.utilityService.customToast(msg, timeLenth, location, cssClassName);
          this.shoppingCartListsAdded.next(this.shoppingCartLists);                           // header에 있는 shopping list에 보냄
    } else {
          const msg = '선택하신 시험이 이미 장바구니에 있습니다.';
          const timeLenth = '1000';
          const location = 'bottom';
          const cssClassName = 'errorToast';
          this.utilityService.customToast(msg, timeLenth, location, cssClassName);
    }

  }

}
