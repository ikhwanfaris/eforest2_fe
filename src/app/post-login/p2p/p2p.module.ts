import { P2pComponent } from './p2p.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [P2pComponent],
  imports: [CommonModule, IonicModule, TranslateModule],
  exports: [P2pComponent],
})
export class P2pModule {}
