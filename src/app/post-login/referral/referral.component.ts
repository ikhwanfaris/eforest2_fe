import { ToastController } from '@ionic/angular';
import { environment } from '../../../environments/environment.prod';
import { UserDetailModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Component, Injector, OnInit } from '@angular/core';
import QrCodeWithLogo from 'qrcode-with-logos';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss'],
})
export class ReferralComponent extends BasePage implements OnInit {
  isMyQR = true;
  qrContent = '';
  userDetails: UserDetailModel;
  constructor(injector: Injector, public authService: AuthService) {
    super(injector);
  }

  ngOnInit() {
    try {
      this.userDetails = JSON.parse(this.authService.getUserDetails());
    } catch (e) {
      this.authService.userDetails();
      this.userDetails = JSON.parse(this.authService.getUserDetails());
    }
    this.getQRcode();
  }

  getQRcode() {
    if (this.isMyQR) {
      this.qrContent = environment.referralUrl + this.userDetails.username;
    } else {
      // this.qrContent = this.userMobile.toString();
    }
    // console.log(this.qrContent);
    const qrresult = {
      canvas: document.getElementById('canvas'),
      content: this.qrContent,
      width: 180,
      height: 180,
      logo: { src: '../assets/images/eforest-logo-vertical.png' },
      //   download: true,
      image: document.getElementById('image'),
    };
    // let logoImgSrc = '';
    // if (this.isMerchant === true) {
    //     logoImgSrc = '../assets/imgs/lollypo-logo.png' ;
    //     qrresult['logo'] = {src: logoImgSrc};
    // }
    const qrCode: any = QrCodeWithLogo;
    const result = new qrCode(qrresult);
    // console.log(result);
    result.getCanvas().then((canvas) => {
      canvas.toDataURL();
      // console.log(canvas.toDataURL());
      // or do ohter things with canvas
    });
  }

  async copyString() {
    let copy: any;
    copy = window.navigator;

    if (copy && copy.clipboard) {
      try {
        await copy.clipboard.writeText(this.qrContent);
      } catch (err) {}
    }
    // this.clipboard.copy(this.qrContent);
    this.showToast(await this.getTrans('SUCCESSFULLY_COPIED'));
  }
}
