import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toefl } from '../../model/toefl.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../model/auth-model/user.model';
import { AuthServiceProvider } from '../../../providers/auth-service/auth-service';


/*


*/

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage implements OnInit {

  toeflLists: Toefl[] = [];
  beginnerToeflLists: Toefl[] = [];
  basicToeflLists: Toefl[] = [];
  interToeflLists: Toefl[] = [];
  advToeflLists: Toefl[] = [];

  postedUser: User;

  loginForm: FormGroup;
  pwdPattern = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fb: FormBuilder,
              private authService: AuthServiceProvider) {}

  ngOnInit() {

    this.loginForm = this.fb.group( {
                    
                      email: ['', Validators.required],
                      password: ['', [Validators.required,
                                      Validators.minLength(6)]]
                      });

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

  doSkipLogin() {
    this.authService.isAuthenticated = false;
    this.moveHomePage();
  }

  doLogin() {
      console.log(this.loginForm.value.email);
      console.log(this.loginForm.value.password);

      const user = new User(this.loginForm.value.email,
                            this.loginForm.value.password);

       this.authService.login(user)
       .subscribe( (result: any) => {
                    console.log( result )
                    this.postedUser = result.user;
                    localStorage.setItem('token', result.token);
                    localStorage.setItem('userName', result.user.name);
                    this.authService.isAuthenticated = true;
                    this.moveHomePage()
                  },
        error => {
                  console.log('에러 메세지', error)
                  this.authService.isAuthenticated = false;
                  this.loginForm.reset();
                }
            )
  }

  doRegister() {
      this.navCtrl.push('SignUpPage',{allToefls: this.toeflLists});
  }

  moveHomePage() {

     console.log('사용자 정보', this.postedUser);
     this.navCtrl.setRoot('HomePage', {allToefls: this.toeflLists,
      beginnerToeflLists: this.beginnerToeflLists,
      basicToeflLists: this.basicToeflLists,
      interToeflLists: this.interToeflLists,
      advToeflLists: this.advToeflLists});
  }


}
