
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Toefl } from '../model/toefl.model';

import { AllToeflListPage } from '../toefl-list/all-toefl-list/all-toefl-list';
import { InterToeflListPage } from './../toefl-list/inter-toefl-list/inter-toefl-list';
import { BeginnerToeflListPage } from './../toefl-list/beginner-toefl-list/beginner-toefl-list';
import { BasicToeflListPage } from './../toefl-list/basic-toefl-list/basic-toefl-list';
import { AdvanceToeflListPage } from './../toefl-list/advance-toefl-list/advance-toefl-list';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { User } from '../model/auth-model/user.model';



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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authService: AuthServiceProvider) {}

  ngOnInit() {

    if (this.authService.isAuthenticated) {
      console.log(this.authService.isAuthenticated);
      this.currentLoginedUser = this.navParams.data.currentLoginedUser,
      console.log(this.currentLoginedUser);
    } else {
      console.log(this.authService.isAuthenticated);
    }
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
