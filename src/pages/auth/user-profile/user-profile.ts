import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../model/auth-model/user.model';


@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  currentUser: User;
  currentAuthStatus: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

                this.currentUser = this.navParams.data.currentUser;
                this.currentAuthStatus = this.navParams.data.currentAuthStatus;
                console.log(this.currentUser);
                console.log(this.currentAuthStatus);
              }


  wishList() {
  	this.navCtrl.push('WishListPage', {direction: 'forward'});
  }

}
