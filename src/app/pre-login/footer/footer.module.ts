import { FooterComponent } from './footer.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule, 
    IonicModule,
    TranslateModule,
  ],
  exports: [
    FooterComponent,
    TranslateModule,
  ],
})
export class FooterModule {}
