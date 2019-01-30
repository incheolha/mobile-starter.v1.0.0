import { Injectable } from '@angular/core';
import { User } from '../../pages/model/auth-model/user.model';
import { HttpClient } from '@angular/common/http';
import { globalConstants } from '../../app/globalConstantsSetting/globalConstants';
import { Subject } from 'rxjs/Subject';
import { Toefl } from '../../pages/model/toefl-model/toefl.model';


@Injectable()
export class AuthServiceProvider {


  toeflLists: Toefl[] = [];

  urlConfig = globalConstants.httpURL;
  user: User;
  currentUserInfo: User;

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

// 사용자가 이미 로그인 하였다가 app에서 다시 로그인하면 이미 로그인이 되었으므로
// welcome.ts에서 storage에 저장된 token정보를 이용하여 서버로 부터 updated된 정보를 가져온다.
// node 서버에 https://examSimv100.heroku.com/user/getUserInfo/?token=을 접근해서 정보를 가져온다.

getCurrentUser(token: string) {
  return this.http.get<{ user: User }>(this.urlConfig + '/user/getUserInfo/' + '?token=' + token);
  }
}
