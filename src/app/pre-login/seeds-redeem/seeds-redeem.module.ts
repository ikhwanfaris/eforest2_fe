import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PreNavbarModule } from '../pre-navbar/pre-navbar.module';
import { FooterModule } from '../footer/footer.module';
import { SeedsRedeemComponent } from './seeds-redeem.component';

const routes: Routes = [
  {
    path: '',
    component: SeedsRedeemComponent,
  },
];

@NgModule({
  declarations: [SeedsRedeemComponent],
  imports: [
    CommonModule,
    IonicModule,
    PreNavbarModule,
    FooterModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class SeedsRedeemModule {}
