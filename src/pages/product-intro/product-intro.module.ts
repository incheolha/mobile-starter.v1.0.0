import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductIntroPage } from './product-intro';

@NgModule({
  declarations: [
    ProductIntroPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductIntroPage),
  ],
})
export class ProductIntroPageModule {}
