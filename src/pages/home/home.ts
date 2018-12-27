
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Toefl } from '../model/toefl.model';

import { AllToeflListPage } from '../toefl-list/all-toefl-list/all-toefl-list';
import { InterToeflListPage } from './../toefl-list/inter-toefl-list/inter-toefl-list';
import { BeginnerToeflListPage } from './../toefl-list/beginner-toefl-list/beginner-toefl-list';
import { BasicToeflListPage } from './../toefl-list/basic-toefl-list/basic-toefl-list';
import { AdvanceToeflListPage } from './../toefl-list/advance-toefl-list/advance-toefl-list';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {

  isAuth: boolean;

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
    } else {
      console.log(this.authService.isAuthenticated);
    }
    this.allToefls = this.navParams.data.allToefls;
    console.log(this.allToefls);
    this.advancedToefls = this.navParams.data.advToeflLists;
    this.intermediateToefls = this.navParams.data.interToeflLists;
    this.basicToefls = this.navParams.data.basicToeflLists;
    this.beginnerToefls = this.navParams.data.beginnerToeflLists;


  }

}
