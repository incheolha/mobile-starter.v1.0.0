
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToeflListServiceProvider } from '../../providers/toefl-list-service/toefl-list-service';
import { Toefl } from '../model/toefl.model';
import { Subscription } from 'rxjs/Subscription';

import { AllToeflListPage } from '../toefl-list/all-toefl-list/all-toefl-list';
import { InterToeflListPage } from './../toefl-list/inter-toefl-list/inter-toefl-list';
import { BeginnerToeflListPage } from './../toefl-list/beginner-toefl-list/beginner-toefl-list';
import { BasicToeflListPage } from './../toefl-list/basic-toefl-list/basic-toefl-list';
import { AdvanceToeflListPage } from './../toefl-list/advance-toefl-list/advance-toefl-list';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  allToefls: Toefl[];
  beginnerToefls: Toefl[];
  basicToefls: Toefl[];
  intermediateToefls: Toefl[];
  advancedToefls: Toefl[];
  toeflListSubscription: Subscription;

  allToeflCheck = false;
  beginnerToeflCheck = false;
  basicToeflCheck = false;
  interToeflCheck = false;
  advToeflCheck = false;
  

    tab1 = AllToeflListPage;
    tab2 = AdvanceToeflListPage;
    tab3 = BasicToeflListPage;
    tab4 = BeginnerToeflListPage;
    tab5 = InterToeflListPage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

                console.log( this.navParams.data.allToefl );
                console.log( this.navParams.data.basicToefl );
                console.log( this.navParams.data.beginnerToefl );
                console.log( this.navParams.data.interToefl );
                console.log( this.navParams.data.advToefl );

                this.allToefls = this.navParams.data.allToefl;
                this.beginnerToefls = this.navParams.data.beginnerToefl;
                this.basicToefls = this.navParams.data.basicToefl;
                this.intermediateToefls = this.navParams.data.interToefl;
                this.advancedToefls = this.navParams.data.advToefl;

          
            if (this.allToefls !== []) {
              
            };
            if (this.beginnerToefls !== []) {
                this.beginnerToefls = null;
            }
               
            if (this.basicToefls !== []) {
              this.basicToefls = null;
            }
            if (this.intermediateToefls !== []) {
              this.intermediateToefls = null;
            }
            if (this.advancedToefls !== []) {
              this.advancedToefls = null;
            }
          }

}
