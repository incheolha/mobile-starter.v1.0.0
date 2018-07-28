import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranscriptPage } from './transcript';

@NgModule({
  declarations: [
    TranscriptPage,
  ],
  imports: [
    IonicPageModule.forChild(TranscriptPage),
  ],
})
export class TranscriptPageModule {}
