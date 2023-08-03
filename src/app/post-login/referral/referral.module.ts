import { PostNavbarModule } from './../post-navbar/post-navbar.module';
import { ReferralComponent } from './referral.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: ReferralComponent,
  }
];


@NgModule({
  declarations: [ReferralComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    PostNavbarModule,
    TranslateModule,
  ],
  exports: [
    RouterModule,
    TranslateModule,
  ]
})
export class ReferralModule { }
