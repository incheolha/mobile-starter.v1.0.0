import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToeflListServiceProvider } from '../../providers/toefl-list-service/toefl-list-service';
import { Toefl } from '../model/toefl.model';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  toeflLists: Toefl[] = [];
  beginnerToeflLists: Toefl[] = [];
  basicToeflLists: Toefl[] = [];
  interToeflLists: Toefl[] = [];
  advToeflLists: Toefl[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toeflExamService: ToeflListServiceProvider) {

                this.toeflExamService.getAllToeflLists().subscribe( data => {
                  console.log( data.toefls );
                  this.toeflLists = data.toefls;

                  if ( this.toeflLists.length !== 0 ) {
                    for ( let toeflItem of this.toeflLists ) {
                      if (toeflItem.toeflLevel == 'Beginner') {
                            this.beginnerToeflLists.push(toeflItem);
                      } else if (toeflItem. toeflLevel == 'Basic') {
                            this.basicToeflLists.push(toeflItem)
                      } else if (toeflItem.toeflLevel == 'InterMediate') {
                            this.interToeflLists.push(toeflItem)
                      } else if (toeflItem.toeflLevel == 'Advanced') {
                            this.advToeflLists.push(toeflItem)
                      }
                    }
                  }
                })
  }

  login() {

    this.navCtrl.setRoot('HomePage', {allToefl: this.toeflLists,
                                      basicToefl: this.basicToeflLists,
                                      beginnerToefl: this.beginnerToeflLists,
                                      interToefl: this.interToeflLists,
                                      advToefl: this.advToeflLists});
  }

  register() {
    this.navCtrl.setRoot('HomePage', this.toeflLists);
  }

}
