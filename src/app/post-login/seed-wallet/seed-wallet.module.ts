import { IonicModule } from '@ionic/angular';
import { SeedWalletComponent } from './seed-wallet.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SeedWalletComponent],
  imports: [CommonModule, IonicModule,TranslateModule,    ReactiveFormsModule,],
  exports: [SeedWalletComponent,TranslateModule],
})
export class SeedWalletModule {}
