import { PostNavbarModule } from './post-navbar/post-navbar.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../post-login/post-navbar/post-navbar.module').then(
        (m) => m.PostNavbarModule
      ),
  },
  {
    path: 'referral',
    loadChildren: () =>
      import('../post-login/referral/referral.module').then(
        (m) => m.ReferralModule
      ),
  },
  {
    path: 'referral',
    loadChildren: () =>
      import('../post-login/beneficiary/beneficiary.module').then(
        (m) => m.BeneficiaryModule
      ),
  },
  {
    path: 'referral',
    loadChildren: () =>
      import('../post-login/earning-limit/earning-limit.module').then(
        (m) => m.EarningModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('../post-login/profile/profile.module').then(
        (m) => m.ProfileModule
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
  ],
  exports: [RouterModule],
})
export class PostLoginModule {}
