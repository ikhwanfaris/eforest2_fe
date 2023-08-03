import { PreNavbarModule } from '../pre-navbar/pre-navbar.module';
import { OtpComponent } from './otp.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: OtpComponent,
  }
];


@NgModule({
  declarations: [OtpComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    PreNavbarModule,
    TranslateModule,
  ],
  exports: [
    RouterModule,
    TranslateModule,
  ]
})
export class OtpModule { }
