import { P2pHistoryModule } from '../p2p-history/p2p-history.module';
import { P2pModule } from './../p2p/p2p.module';
import { IncentiveModule } from './../incentive/incentive.module';
import { PlantingModule } from './../planting/planting.module';
import { SeedWalletModule } from './../seed-wallet/seed-wallet.module';
import { MyPackageModule } from './../my-package/my-package.module';
import { PurchaseModule } from './../purchase/purchase.module';
import { DashboardModule } from './../dashboard/dashboard.module';
import { ProfileModule } from './../profile/profile.module';
import { ProfileComponent } from './../profile/profile.component';
import { PostNavbarComponent } from './post-navbar.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MyTeamModule } from '../my-team/my-team.module';
import { MyDirectBonusModule } from '../my-direct-bonus/my-direct-bonus.module';
import { MyTeamBonusModule } from '../my-team-bonus/my-team-bonus.module';
import { TranslateModule } from '@ngx-translate/core';
import { UsdtWalletModule } from '../usdt-wallet/usdt-wallet.module';

const routes: Routes = [
  {
    path: '',
    component: PostNavbarComponent,
  },
];

@NgModule({
  declarations: [PostNavbarComponent],
  imports: [
    CommonModule,
    IonicModule,
    ProfileModule,
    DashboardModule,
    PurchaseModule,
    MyPackageModule,
    MyTeamModule,
    SeedWalletModule,
    MyDirectBonusModule,
    MyTeamBonusModule,
    PlantingModule,
    TranslateModule,
    UsdtWalletModule,
    P2pModule,
    P2pHistoryModule,
    IncentiveModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule, TranslateModule],
})
export class PostNavbarModule {}
