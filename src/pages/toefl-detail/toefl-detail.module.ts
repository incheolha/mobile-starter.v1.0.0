import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ToeflDetailPage } from './toefl-detail';

@NgModule({
  declarations: [
    ToeflDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ToeflDetailPage),
  ],
})
export class ToeflDetailPageModule {}
