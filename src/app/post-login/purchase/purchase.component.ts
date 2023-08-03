import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { PackageService } from './../../services/packages.service';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import {
  PackageDataModel,
  PaymentDataModel,
  OrderDataModel,
} from 'src/app/models/packages.model';
import { SwiperOptions } from 'swiper';
import { BasePage } from 'src/app/base-page/base-page';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent extends BasePage implements OnInit {
  swiperConfig: SwiperOptions = {
    grabCursor: !0,
    watchSlidesProgress: !0,
    loop: !0,
    loopedSlides: 5,
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: false,
    navigation: !0,
    pagination: !1,
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  };
  loading;
  paymentUrl;
  replantSeed;
  paymentUSDT;
  toggleBool = false;
  packageQty;
  packageId;
  feeAmount;
  paymentAmount;
  packageQuantity = [
    { quantity: 1 },
    { quantity: 1 },
    { quantity: 1 },
    { quantity: 1 },
    { quantity: 1 },
  ];

  constructor(
    public packageService: PackageService,
    public loadingCtrl: LoadingController,
    private sanitizer: DomSanitizer,
    injector: Injector,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    super(injector);
  }
  seedPackages: PackageDataModel[];
  seedPlantPackages: OrderDataModel;
  async ngOnInit() {
    this.seedPackages = await (
      await this.packageService.getSeedPackages()
    ).data;
  }

  getPackageClass(id) {
    switch (id) {
      case 0:
        return { package1: true };
        break;
      case 1:
        return { package2: true };
        break;
      case 2:
        return { package3: true };
        break;
      case 3:
        return { package4: true };
        break;
      case 4:
        return { package5: true };
        break;
    }
  }

  // Button For Purchase
  async purchasePackage(id, index, price) {
    try {
      // this.buyingPackage = true;
      this.showLoadingView();
      const result = await this.packageService.purchasePackage(
        id,
        this.packageQuantity[index].quantity
      );

      // console.log(result);
      if (result.success) {
        this.paymentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          result.payment_url
        );
        // console.log(this.paymentUrl);
        // this.showToast(
        //   "Successfully purchased, please check your purchases under 'My Package'",
        //   3000,
        //   'top',
        //   'success'
        // );
        this.dismissLoadingView();
      }
    } catch (e) {
      console.log(e);
      this.showToast(e.error.message, 3000, 'top', 'error');
      this.dismissLoadingView();
      // this.buyingPackage = false;
      console.log(e);
    }
  }

  dismissModal() {
    this.modalCtrl.dismiss();
    this.paymentUrl = '';
  }

  async purchaseOption(id, index, price) {
    const alert = await this.alertController.create({
      header: this.translate.instant('PURCHASE_BY'),
      buttons: [
        {
          text: "OK",
          handler: (input) => {
            if(input == 'sending usdt') {
              this.purchasePackage(id, index, price);
            } 
            else if(input == 'using usdt wallet balance'){
              this.usdtBalanceWallet(id,index, price);
            }
          }
        }
      ],
      inputs: [
        {
          label: this.translate.instant('SENDING_USDT'),
          type: 'radio',
          value: 'sending usdt',
        },
        {
          label: this.translate.instant('PURCHASE_USDT_WALLET_BALANCE'),
          type: 'radio',
          value: 'using usdt wallet balance',
        },
      ],
    });

    await alert.present();
  }


  changeEvent(event) {
    this.toggleBool = !this.toggleBool;
  }


  //Confirm Purchase Using USDT Balance
  async confirmPurchaseUSDT() {
    try {
      this.showLoadingView();
      const result = await this.packageService.purchaseusdtWallet(
        this.packageId,
        this.packageQty
      );
      // console.log(result);

      if (result.success) {
        this.authService.usdtBalance();
        //this.dismissModalReplant();
        //this.toggleBool = true;
        this.authService.userDetails().then(() => {
          this.authService.getSeedBalance();
        });
        this.showToast(
          await this.getTrans('SUCCESSFULLY_USING_USDT'),
          3000,
          'top',
          'success'
        );
        this.dismissLoadingView();
      }
    } catch (e) {
      //console.log(e);
      this.dismissLoadingView();
      this.showToast(e.error.message, 3000, 'top', 'error');
      //this.dismissModalReplant();
      // this.buyingPackage = false;
      //console.log(e);
    }
  }

  //Confirm Replant
  async confirmReplant() {
    try {
      this.showLoadingView();
      const result = await this.packageService.replantsPackage(
        this.packageId,
        this.packageQty
      );
      // console.log(result);

      if (result.success) {
        this.authService.usdtBalance();
        //this.dismissModalReplant();
        this.toggleBool = false;
        this.authService.userDetails().then(() => {
          this.authService.getSeedBalance();
        });
        this.showToast(
          await this.getTrans('SUCCESSFULLY_REPLANT_SEED'),
          3000,
          'top',
          'success'
        );
        this.dismissLoadingView();
      }
    } catch (e) {
      //console.log(e);
      this.dismissLoadingView();
      this.showToast(e.error.message, 3000, 'top', 'error');
      //this.dismissModalReplant();
      // this.buyingPackage = false;
      //console.log(e);
    }
  }

  // Purchase USDT Wallet Balance
  async usdtBalanceWallet(id, index, price) {
    //this.toggleBool = true;
    this.paymentUSDT = this.sanitizer;
    this.packageId = id;
    this.packageQty = this.packageQuantity[index].quantity;
    
    // const result = await this.packageService.replantCalculation(
    //   this.packageId,
    //   this.packageQty
    // );
    this.paymentAmount = this.packageQty * parseFloat(price);

    // this.paymentAmount = result.payment_amount;
    // console.log(result);
  }

  dismissModalUsdtBalance() {
    this.modalCtrl.dismiss();
    this.paymentUSDT = '';
    this.toggleBool = false;
  }

  // Replant For Purchase
  // async replantPackage(id, index) {
  //   //this.toggleBool = true;
  //   this.replantSeed = this.sanitizer;
  //   this.packageId = id;
  //   this.packageQty = this.packageQuantity[index].quantity;
  //   const result = await this.packageService.replantCalculation(
  //     this.packageId,
  //     this.packageQty
  //   );
  //   this.feeAmount = result.fee_amount;
  //   this.paymentAmount = result.payment_amount;
  //   // console.log(result);
  // }

  // dismissModalReplant() {
  //   this.modalCtrl.dismiss();
  //   this.replantSeed = '';
  //   this.toggleBool = false;
  // }

  onSwiper(ev) {}

  onSlideChange(ev) {}

  handleMinus(index) {
    if (this.packageQuantity[index].quantity > 1) {
      this.packageQuantity[index].quantity--;
    }
  }

  handlePlus(index) {
    this.packageQuantity[index].quantity++;
  }

  valueChange(ev, index) {
    this.packageQuantity[index].quantity = Number(ev.value);
  }
}
