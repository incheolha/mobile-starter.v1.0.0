
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Toefl } from '../model/toefl-model/toefl.model';

import { AllToeflListPage } from '../toefl-list/all-toefl-list/all-toefl-list';
import { InterToeflListPage } from './../toefl-list/inter-toefl-list/inter-toefl-list';
import { BeginnerToeflListPage } from './../toefl-list/beginner-toefl-list/beginner-toefl-list';
import { BasicToeflListPage } from './../toefl-list/basic-toefl-list/basic-toefl-list';
import { AdvanceToeflListPage } from './../toefl-list/advance-toefl-list/advance-toefl-list';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { User } from '../model/auth-model/user.model';
import { ShoppingCartServiceProvider } from '../../providers/shopping-cart-service/shopping-cart-service';
import { Shoppingcart } from '../model/payment-model/shoppingcart.model';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {

  isAuth: boolean;
  currentLoginedUser: User;

  allToefls: Toefl[] = [];
  beginnerToefls: Toefl[] = [];
  basicToefls: Toefl[] = [];
  intermediateToefls: Toefl[] = [];
  advancedToefls: Toefl[] = [];

    tab1 = AllToeflListPage;
    tab2 = AdvanceToeflListPage;
    tab3 = InterToeflListPage;
    tab4 = BasicToeflListPage;
    tab5 = BeginnerToeflListPage;


  shoppingCartLists: Shoppingcart[];
    public slides = [
      { src: 'assets/imgs/slide_1.jpg'},
      { src: 'assets/imgs/slide_2.jpg'},
      { src: 'assets/imgs/slide_3.jpg'}
   ];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private shoppingCartService: ShoppingCartServiceProvider,
              private authService: AuthServiceProvider) {}

  ngOnInit() {

    this.shoppingCartLists = this.shoppingCartService.getShoppingCartLists();

    if (this.authService.isAuthenticated) {
      this.currentLoginedUser = this.navParams.data.currentLoginedUser

    };

    this.allToefls = this.navParams.data.allToefls;

      if ( this.allToefls.length !== 0 ) {
          for ( let toeflItem of this.allToefls ) {
                if (toeflItem.toeflLevel === 'Beginner') {
                      this.beginnerToefls.push(toeflItem);
                } else if (toeflItem. toeflLevel === 'Basic') {
                      this.basicToefls.push(toeflItem)
                } else if (toeflItem.toeflLevel === 'InterMediate') {
                      this.intermediateToefls.push(toeflItem)
                } else if (toeflItem.toeflLevel === 'Advanced') {
                      this.advancedToefls.push(toeflItem)
                }
          }
      }

  }


}
