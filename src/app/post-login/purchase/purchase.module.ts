import { FormsModule } from '@angular/forms';
import { PurchaseComponent } from './purchase.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PurchaseComponent],
  imports: [
    CommonModule, 
    IonicModule, 
    SwiperModule, 
    FormsModule,
    TranslateModule,
  ],
  exports: [
    PurchaseComponent,
    TranslateModule,
  ],
})
export class PurchaseModule {}
