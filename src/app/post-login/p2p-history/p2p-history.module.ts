import { P2pHistoryComponent } from './p2p-history.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [P2pHistoryComponent],
  imports: [CommonModule, IonicModule, TranslateModule],
  exports: [P2pHistoryComponent],
})
export class P2pHistoryModule {}
