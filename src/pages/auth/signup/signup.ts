import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toefl } from '../../model/toefl-model/toefl.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../model/auth-model/user.model';
import { AuthServiceProvider } from '../../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignUpPage implements OnInit {

  toeflLists: Toefl[] = [];


  signUser: User;
  signForm: FormGroup;
  pwdPattern = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fb: FormBuilder,
              private storage: Storage,
              private authService: AuthServiceProvider) {}

  ngOnInit() {

    this.signForm = this.fb.group({
                                    name: [''],
                                    email: ['', Validators.required],
                                    password: ['', [Validators.required,
                                                    Validators.minLength(6)]]
                                  });

    this.toeflLists = this.navParams.data.originalToefls;
  }

  doSkipLogin() {
    this.authService.isAuthenticated = false;
    this.authService.authChange.next(false);
    this.moveHomePage();
  }


  doRegister() {

    console.log(this.signForm.value.name);
    console.log(this.signForm.value.email);
    console.log(this.signForm.value.password);

    const user = new User(this.signForm.value.email,
                          this.signForm.value.password,
                          this.signForm.value.name);

    this.authService.signUp(user).subscribe( (result: any) => {
                                    console.log( result )
                                    this.signUser = result.user;

                                    this.storage.ready().then(() => {

                                              this.storage.set('authStatus', true).then( loginStatus => {
                                                              console.log('인증상태', loginStatus);
                                                            });

                                              this.storage.set('token', result.token).then( token => {
                                                                });

                                    })

                                    this.authService.isAuthenticated = true;   //이놈은 SignUpPage영향을 주고
                                    this.authService.authChange.next(true);    //요놈은 sidemenu에 있는 인증정보에 영향을 줌
                                    this.authService.loginedUser.next(this.signUser); //요놈은 sidemenu에 user정보를 제공함

                                    this.moveHomePage()


                                  },
                                  error => {
                                    console.log('에러 메세지', error)
                                    this.authService.isAuthenticated = false;
                                    this.signForm.reset();
                                  })

  }

  moveHomePage() {
    console.log('사용자 정보', this.signUser);
    this.navCtrl.setRoot('HomePage', {
                                      currentLoginedUser: this.signUser,
                                      allToefls: this.toeflLists
                                      });
  }

doLogin() {
  this.navCtrl.push('LoginPage', {originalToefls: this.toeflLists});
}

}
