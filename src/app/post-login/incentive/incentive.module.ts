import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { IncentiveComponent } from './incentive.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [IncentiveComponent],
  imports: [CommonModule, IonicModule, TranslateModule],
  exports: [IncentiveComponent],
})
export class IncentiveModule {}
