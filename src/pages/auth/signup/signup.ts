import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../../providers/auth-service/auth-service';
import { User } from '../../model/auth-model/user.model';
import { Toefl } from '../../model/toefl.model';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignUpPage implements OnInit {


  toeflLists: Toefl[] = [];
  beginnerToeflLists: Toefl[] = [];
  basicToeflLists: Toefl[] = [];
  interToeflLists: Toefl[] = [];
  advToeflLists: Toefl[] = [];
  
  signUpForm: FormGroup;
  signUpUser: User;

  pwdPattern = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private authService: AuthServiceProvider,
              private fb: FormBuilder) {}

  ngOnInit() {
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
    
    this.signUpForm = this.fb.group({
                                        name: [''],
                                        email: ['', Validators.required],
                                        password: ['', [Validators.required,
                                                       Validators.minLength(6)]]
                      });
  
  }

  doSignUp() {

    const user = new User( this.signUpForm.value.name,
                           this.signUpForm.value.email,
                           this.signUpForm.value.password )
    this.authService.doSignUp(user).subscribe( (result: any) => {
                                    console.log(result.user);
                                    this.signUpUser = result.user;
                                    localStorage.setItem('token', result.token);
                                    localStorage.setItem('userName', result.user.name);
                                    this.authService.isAuthenticated = true;
                                    this.moveHomePage();
                                   })
  }


  moveHomePage() {
    console.log('사용자 정보', this.signUpUser);
    this.navCtrl.setRoot('HomePage', {allToefls: this.toeflLists,
     beginnerToeflLists: this.beginnerToeflLists,
     basicToeflLists: this.basicToeflLists,
     interToeflLists: this.interToeflLists,
     advToeflLists: this.advToeflLists});
 }

}
