import { UserDetailModel } from './../../models/user.model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BasePage } from 'src/app/base-page/base-page';
import { ActionSheetController } from '@ionic/angular';
import { PackageService } from 'src/app/services/packages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BasePage implements OnInit {
  totalTrees = 0;
  constructor(
    private authServ: AuthService,
    injector: Injector,
    public actionSheetCtrl: ActionSheetController,
    public packageServ: PackageService,
    private router: Router
  ) {
    super(injector);
  }
  userDetails: UserDetailModel;
  first_name = '';
  joinedDate = 0;
  referralUrl = '';
  async ngOnInit() {
    this.userDetails = JSON.parse(await this.authServ.getUserDetails());
    this.joinedDate = Number(this.userDetails.joined_at_timestamp) * 1000;
    if (this.userDetails.fullname) {
      const fullName = this.userDetails.fullname.split(' ');
      if (fullName) {
        this.first_name = fullName[0];
      }
    }
    this.referralUrl = environment.referralUrl + this.userDetails.username;

    const totalTrees = await this.packageServ.getOrdersList();
    this.totalTrees =
      Number(totalTrees.total_love_tree) + Number(totalTrees.total_earth_tree);
  }

  async copyString() {
    let copy: any;
    copy = window.navigator;

    if (copy && copy.clipboard) {
      try {
        await copy.clipboard.writeText(this.referralUrl);
      } catch (err) {}
    }
    // this.clipboard.copy(this.qrContent);
    const copyMessage = await this.getTrans('SUCCESSFULLY_COPIED');
    this.showToast(copyMessage);
  }

  async presentActionSheet() {
    const descText = this.translate.instant('SOCIAL_SHARE_DESC', {
      totalTrees: this.totalTrees,
      referralUrl: this.referralUrl,
    });

    const actionSheet = await this.actionSheetCtrl.create({
      header: this.translate.instant('SOCIAL_SHARE'),
      cssClass: 'social_actionsheet',
      buttons: [
        {
          text: 'Facebook',
          icon: 'logo-facebook',
          handler: () => {
            window.open(
              `https://www.facebook.com/share.php?u=${this.referralUrl}`,
              'mywin',
              'width=500,height=500'
            );
          },
        },
        {
          text: 'Twitter',
          icon: 'logo-twitter',
          handler: () => {
            window.open(
              `https://twitter.com/intent/tweet?url=${''}&text=${descText}`
            );
          },
        },
        {
          text: 'Telegram',
          icon: 'paper-plane-outline',
          handler: () => {
            window.open(
              `https://t.me/share/url?url=${this.referralUrl}&text=${descText}`
            );
          },
        },
        {
          text: 'Whatsapp',
          icon: 'logo-whatsapp',
          handler: () => {
            window.open(`https://wa.me/send?text=${descText}`);
          },
        },
        {
          text: this.translate.instant('CANCEL'),
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });

    await actionSheet.present();
  }

  numberWithCommas(x) {
      return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0;
  }
}
