import { PreNavbarComponent } from './pre-navbar.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PreNavbarComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
  ],
  exports: [
    PreNavbarComponent,
    TranslateModule,

  ]
})
export class PreNavbarModule { }
