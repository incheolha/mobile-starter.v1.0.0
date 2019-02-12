import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';

/*
  Generated class for the SocalLoginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SocalLoginServiceProvider {


  googleAppConfig = {
    'scopes': 'https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/contacts.readonly',
    'webClientId': '427231965425-vm5q3b8nhki1n7l5r6grseicif767jtd.apps.googleusercontent.com',
    'offline': true
}

userData1 = null;

  constructor(public http: HttpClient, private googlePlus: GooglePlus, private facebook: Facebook) {
    console.log('Hello SocalLoginServiceProvider Provider');
  }

  googleLogin() {
    return this.googlePlus.login(this.googleAppConfig);
  }

  facebookLogin() {
    return this.facebook.login(['email', 'public_profile', 'user_photos']);
  }

  facebookGetLoginStatus() {
    return this.facebook.getLoginStatus();
  }
  facebookGetUserProfile() {
    return this.facebook.api('me?fields=id,name,email,picture.width(720).height(720).as(picture_large)', []);
  }
  facebookLogOut() {
    return this.facebook.logout();
  }
}
