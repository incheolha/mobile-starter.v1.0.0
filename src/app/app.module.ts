import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonAffixModule } from 'ion-affix';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { CacheModule } from 'ionic-cache';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';

import { SplashPage } from '../pages/splash/splash';
import { AdvanceToeflListPage } from '../pages/toefl-list/advance-toefl-list/advance-toefl-list';
import { InterToeflListPage } from '../pages/toefl-list/inter-toefl-list/inter-toefl-list';
import { BasicToeflListPage } from '../pages/toefl-list/basic-toefl-list/basic-toefl-list';
import { AllToeflListPage } from './../pages/toefl-list/all-toefl-list/all-toefl-list';
import { BeginnerToeflListPage } from './../pages/toefl-list/beginner-toefl-list/beginner-toefl-list';
import { ToeflListServiceProvider } from '../providers/toefl-list-service/toefl-list-service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpClientModule } from '@angular/common/http';
import { ShortenPipe } from '../pages/shared/pipe-collection/shorthen-pipe';
import { ShoppingCartServiceProvider } from '../providers/shopping-cart-service/shopping-cart-service';
import { UtiltiyServiceProvider } from '../providers/utiltiy-service/utiltiy-service';
import { SocalLoginServiceProvider } from '../providers/socal-login-service/socal-login-service';

@NgModule({
  declarations: [
    MyApp,
    SplashPage,
    AdvanceToeflListPage,
    InterToeflListPage,
    BasicToeflListPage,
    BeginnerToeflListPage,
    AllToeflListPage,
    ShortenPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonAffixModule,
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    CacheModule.forRoot(),
    IonicModule.forRoot(MyApp,
                              {iconMode: 'ios',
                                backButtonIcon: 'ios-arrow-back',
                                tabHiglight: true,
                                platforms: {
                                  android: {
                                    tabsPlacement: 'top'
                                  }
                                }
                              })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SplashPage,
    AdvanceToeflListPage,
    InterToeflListPage,
    BasicToeflListPage,
    BeginnerToeflListPage,
    AllToeflListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    GooglePlus,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ToeflListServiceProvider,
    AuthServiceProvider,
    ShoppingCartServiceProvider,
    UtiltiyServiceProvider,
    SocalLoginServiceProvider
  ]
})
export class AppModule {}
