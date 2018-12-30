import { Injectable } from '@angular/core';
import { User } from '../../pages/model/auth-model/user.model';
import { HttpClient } from '@angular/common/http';
import { globalConstants } from '../../app/globalConstantsSetting/globalConstants';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Toefl } from '../../pages/model/toefl.model';


@Injectable()
export class AuthServiceProvider {


  toeflLists: Toefl[] = [];

  urlConfig = globalConstants.httpURL;
  user: User;
  isAuthenticated: boolean;

  authChange = new Subject<boolean>();
  loginedUser = new Subject<User>();

constructor( private http: HttpClient ) {}


authChangeListener() {
  return this.authChange.asObservable();
}
loginedUserListener() {
  return this.loginedUser.asObservable();
}

signUp(user: User) {
  return this.http.post< { message: string,
                           token: string,
                           usr: User }>
                      (this.urlConfig + '/user/signup', user)

}

login(user: User) {

  return this.http.post< { message: string,
                           token: string,
                           user: User }>
            (this.urlConfig + '/user/login', user)

}

}
