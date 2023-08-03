import { TranslateModule } from '@ngx-translate/core';
import { LanguagesComponent } from './languages.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LanguagesComponent],
  imports: [CommonModule, IonicModule, TranslateModule],
  exports: [LanguagesComponent],
})
export class LanguagesModule {}
