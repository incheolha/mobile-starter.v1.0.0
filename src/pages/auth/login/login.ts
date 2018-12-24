import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toefl } from '../../model/toefl.model';

/*


*/

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  toeflLists: Toefl[] = [];
  beginnerToeflLists: Toefl[] = [];
  basicToeflLists: Toefl[] = [];
  interToeflLists: Toefl[] = [];
  advToeflLists: Toefl[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.toeflLists = this.navParams.data.allToefl;

          if ( this.toeflLists.length !== 0 ) {
            for ( let toeflItem of this.toeflLists ) {
              if (toeflItem.toeflLevel === 'Beginner') {
                    this.beginnerToeflLists.push(toeflItem);
              } else if (toeflItem. toeflLevel === 'Basic') {
                    this.basicToeflLists.push(toeflItem)
              } else if (toeflItem.toeflLevel === 'InterMediate') {
                    this.interToeflLists.push(toeflItem)
              } else if (toeflItem.toeflLevel === 'Advanced') {
                    this.advToeflLists.push(toeflItem)
              }
            }
          }

  }

  doLogin() {
    this.navCtrl.setRoot('HomePage', {allToefls: this.toeflLists,
                                      beginnerToeflLists: this.beginnerToeflLists,
                                      basicToeflLists: this.basicToeflLists,
                                      interToeflLists: this.interToeflLists,
                                      advToeflLists: this.advToeflLists});
  }

  doRegister() {

  }

}
