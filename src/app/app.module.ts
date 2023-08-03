import { BannerAdsModule } from './banner-ads/banner-ads.module';
import { BannerAdsComponent } from './banner-ads/banner-ads.component';
import { HomeAnnouncementModule } from './home-announcement/home-announcement.module';
import { HomeAnnouncementComponent } from './home-announcement/home-announcement.component';
import { PlantingGameModule } from './post-login/planting-game/planting-game.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { AnnouncementComponent } from './announcement/announcement.component';
import { LanguagesModule } from './languages/languages.module';
import { LanguagesComponent } from './languages/languages.component';
import { PostNavbarModule } from './post-login/post-navbar/post-navbar.module';
import { PostNavbarComponent } from './post-login/post-navbar/post-navbar.component';
import { PreNavbarComponent } from './pre-login/pre-navbar/pre-navbar.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { PreNavbarModule } from './pre-login/pre-navbar/pre-navbar.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SwiperModule } from 'swiper/angular';

export function HttpLoaderFactory(http: HttpClient) {
  /** added getTime function to prevent caching issue */
  return new TranslateHttpLoader(
    http,
    './assets/locale/',
    '.json?cb=' + new Date().getTime()
  );
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    PreNavbarComponent,
    PostNavbarComponent,
    LanguagesComponent,
    AnnouncementComponent,
    BannerAdsComponent,
    HomeAnnouncementComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    PreNavbarModule,
    PostNavbarModule,
    AnnouncementModule,
    HomeAnnouncementModule,
    BannerAdsModule,
    HomeAnnouncementModule,
    LanguagesModule,
    PlantingGameModule,
    BrowserAnimationsModule,
    SwiperModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
