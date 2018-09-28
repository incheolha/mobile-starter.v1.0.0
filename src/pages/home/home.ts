
import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class HomePage implements OnInit, OnDestroy {

  toefls: Toefl[] = [];
  beginnerToefls: Toefl[] = [];
  basicToefls: Toefl[] = [];
  intermediateToefls: Toefl[] = [];
  advancedToefls: Toefl[] = [];
  toeflListSubscription: Subscription;

  public slides = [
                      { src: 'assets/imgs/slide_1.jpg'},
                      { src: 'assets/imgs/slide_2.jpg'},
                      { src: 'assets/imgs/slide_3.jpg'}
                   ];

    tab1 = AllToeflListPage;
    tab2 = AdvanceToeflListPage;
    tab3 = BasicToeflListPage;
    tab4 = BeginnerToeflListPage;
    tab5 = InterToeflListPage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toeflExamService: ToeflListServiceProvider) {

              }


  ngOnInit() {

    this.toeflListSubscription = this.toeflExamService.toeflListChanged
                                                      .subscribe( (toefls: Toefl[]) => {
                                                        this.toefls = toefls;

                                                        console.log( this.toefls );
                                                      } );
    this.toefls = this.toeflExamService.getAllToeflLists();
                  console.log( this.toefls);

  }

  ngOnDestroy() {
    this.toeflListSubscription.unsubscribe();
  }

}
