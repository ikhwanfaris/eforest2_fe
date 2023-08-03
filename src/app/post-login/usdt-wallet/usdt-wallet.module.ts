import { IonicModule } from '@ionic/angular';
import { UsdtWalletComponent } from './usdt-wallet.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsdtWalletComponent],
  imports: [CommonModule, IonicModule,TranslateModule,ReactiveFormsModule],
  exports: [UsdtWalletComponent,TranslateModule],
})
export class UsdtWalletModule {}
