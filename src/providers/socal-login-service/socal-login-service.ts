import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus';

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

  constructor(public http: HttpClient, private googlePlus: GooglePlus) {
    console.log('Hello SocalLoginServiceProvider Provider');
  }

  googleLogin() {
    return this.googlePlus.login(this.googleAppConfig);
  }
}
