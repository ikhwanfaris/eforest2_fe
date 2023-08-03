import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Banner } from '../models/ads.model';

@Component({
  selector: 'app-banner-ads',
  templateUrl: './banner-ads.component.html',
  styleUrls: ['./banner-ads.component.scss'],
})
export class BannerAdsComponent implements OnInit {
  banner: Banner;
  @Input() modal: ModalController;
  showAd = environment.adsense.show;
  constructor() {}

  ngAfterViewInit() {
    this.banner = {
      adClient: environment.adsense.adClient,
      adSlot: environment.adsense.adSlot,
      adFormat: 'auto',
      fullWidthResponsive: true,
    };
    setTimeout(() => {
      try {
        (window['adsbygoogle'] = window['adsbygoogle'] || []).push({
          overlays: { bottom: true },
        });
      } catch (e) {
        console.error(e);
      }
    }, 100);
  }

  ngOnInit() {}

  onDismiss() {
    this.modal.dismiss();
  }
}
