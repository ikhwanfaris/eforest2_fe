import { FooterModule } from './../footer/footer.module';
import { PreNavbarModule } from '../pre-navbar/pre-navbar.module';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PreNavbarModule,
    FooterModule,
    SwiperModule,
    TranslateModule,
  ],
  exports: [
    TranslateModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {

}
