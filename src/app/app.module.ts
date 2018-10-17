import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonAffixModule } from 'ion-affix';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { SplashPage } from '../pages/splash/splash';
import { AdvanceToeflListPage } from '../pages/toefl-list/advance-toefl-list/advance-toefl-list';
import { InterToeflListPage } from '../pages/toefl-list/inter-toefl-list/inter-toefl-list';
import { BasicToeflListPage } from '../pages/toefl-list/basic-toefl-list/basic-toefl-list';
import { AllToeflListPage } from './../pages/toefl-list/all-toefl-list/all-toefl-list';
import { BeginnerToeflListPage } from './../pages/toefl-list/beginner-toefl-list/beginner-toefl-list';
import { ToeflListServiceProvider } from '../providers/toefl-list-service/toefl-list-service';
import { HttpModule } from '@angular/http';
import { ShortenPipe } from '../pages/shared/pipe-collection/shorthen-pipe';

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
    HttpModule,
    IonAffixModule,
    IonicModule.forRoot(MyApp,
                              {iconMode: 'ios',
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

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ToeflListServiceProvider
  ]
})
export class AppModule {}
