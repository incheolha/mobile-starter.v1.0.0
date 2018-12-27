import { Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../pages/model/auth-model/user.model';
import { HttpClient } from '@angular/common/http';
import { globalConstants } from '../../app/globalConstantsSetting/globalConstants';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Toefl } from '../../pages/model/toefl.model';
import { stringify } from '@angular/compiler/src/util';


@Injectable()
export class AuthServiceProvider {


  toeflLists: Toefl[] = [];

  urlConfig = globalConstants.httpURL;
  user: User;
  isAuthenticated: boolean;

  authChange = new Subject<boolean>();

constructor( private http: HttpClient ) {}


authChangeListener() {
  return this.authChange.asObservable();
}

doSignUp(user: User) {
  return this.http.post< { message: string,
                           token: string,
                           usr: User }>
                      (this.urlConfig + 'user/signup', user)
                                  
}

login(user: User) {

  return this.http.post< { message: string,
                           token: string,
                           user: User }>
            (this.urlConfig + '/user/login', user)

}

authSucess(authStatus: boolean) {
  return this.authChange.next(authStatus);

}
}
