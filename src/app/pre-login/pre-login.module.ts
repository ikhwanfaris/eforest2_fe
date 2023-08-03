import { PreNavbarModule } from './pre-navbar/pre-navbar.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../pre-login/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../pre-login/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'r',
    loadChildren: () =>
      import('../pre-login/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'r/:referral',
    loadChildren: () =>
      import('../pre-login/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'otp',
    loadChildren: () =>
      import('../pre-login/otp/otp.module').then((m) => m.OtpModule),
  },
  {
    path: 'partners',
    loadChildren: () =>
      import('../pre-login/partners/partners.module').then(
        (m) => m.PartnersModule
      ),
  },
  {
    path: 'fruits-redemption',
    loadChildren: () =>
      import('../pre-login/seeds-redeem/seeds-redeem.module').then(
        (m) => m.SeedsRedeemModule
      ),
  },
];

@NgModule({
  // declarations: [DashboardComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    PreNavbarModule,
  ],
  exports: [RouterModule],
})
export class PreLoginModule {}
