import { BannerAdsComponent } from './banner-ads.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [BannerAdsComponent],
  imports: [CommonModule, IonicModule],
  exports: [BannerAdsComponent],
})
export class BannerAdsModule {}
