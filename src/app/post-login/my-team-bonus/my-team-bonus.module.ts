import { IonicModule } from '@ionic/angular';
import { MyTeamBonusComponent } from './my-team-bonus.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MyTeamBonusComponent],
  imports: [CommonModule, IonicModule,TranslateModule],
  exports: [MyTeamBonusComponent,TranslateModule],
})
export class MyTeamBonusModule {}
