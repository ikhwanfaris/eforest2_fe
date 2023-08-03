import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { OrderDataModel } from 'src/app/models/packages.model';
import { PackageService } from 'src/app/services/packages.service';
import { SeedsService } from 'src/app/services/seed.service';
import { USDTService } from 'src/app/services/usdt.service';
import { BasePage } from '../../base-page/base-page';
import { PostNavbarComponent } from '../post-navbar/post-navbar.component';
import * as moment from 'moment';

@Component({
  selector: 'app-usdt-wallet',
  templateUrl: './usdt-wallet.component.html',
  styleUrls: ['./usdt-wallet.component.scss'],
})
export class UsdtWalletComponent extends BasePage implements OnInit {
  transaction_selected = 1;
  bonusList;
  range_selected = 1;
  totalEntry: any;
  page = 1;
  entry: number;
  temptotalPages: number;
  totalPages: number;
  beforeLastPages: number;
  beforeLastEnrty: number;
  date: Date;
  today: number;
  currentDate: string;
  yesterdayDate: string;
  sevendayDate: string;
  thirtydayDate: string;
  sixtydayDate: string;
  ninetydayDate: string;
  param: string;
  displayPages = [];
  is_loading = true;
  public form: FormGroup;
  usdtOTPForm: FormGroup;
  usdtWithdrawForm: FormGroup;
  paymentUrl;
  isDepositOpen = false;
  isWithdrawOpen = false;
  entry2: number;
  submitted = false;
  otpDisabled = false;
  otp_duration = 0;
  interval;
  sortBy = 'datetime';
  sortDesc = true;
  date_start;
  constructor(
    private testServ: PostNavbarComponent,
    private seedServ: SeedsService,
    injector: Injector,
    public packageService: PackageService,
    private sanitizer: DomSanitizer,
    private usdtServ: USDTService
  ) {
    super(injector);
  }

  async ngOnInit() {
    this.form = new FormGroup({
      bef_name: new FormControl('', Validators.pattern('^[0-9]*$')),
    });
    this.usdtOTPForm = new FormGroup({
      wallet_address: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
    });
    this.usdtWithdrawForm = new FormGroup({
      request_token: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      otp_code: new FormControl('', Validators.required),
    });

    this.is_loading = true;
    this.currentDate = moment().format('YYYY-MM-DD');
    this.date_start = this.currentDate;
    this.yesterdayDate = moment().subtract('days', 1).format('YYYY-MM-DD');
    this.sevendayDate = moment().subtract('days', 7).format('YYYY-MM-DD');
    this.thirtydayDate = moment().subtract('days', 30).format('YYYY-MM-DD');
    this.sixtydayDate = moment().subtract('days', 60).format('YYYY-MM-DD');
    this.ninetydayDate = moment().subtract('days', 90).format('YYYY-MM-DD');

    await this.adjustTableView();

    // console.log(this.bonusList)

    this.is_loading = false;
  }

  async transactionChange(type) {
    this.page = 1;
    this.entry = 20;
    this.transaction_selected = type;
    this.adjustTableView();
  }

  async adjustTableView() {
    await this.showLoadingView();
    this.is_loading = true;

    this.bonusList = await this.seedServ.USDTTxnList(
      this.sortDesc,
      this.sortBy,
      this.page,
      this.transaction_selected,
      this.date_start,
      this.currentDate
    );

    this.totalEntry = this.bonusList.data.total_filtered_item_count;
    if (this.bonusList.data.total_filtered_item_count < 20) {
      this.entry = this.bonusList.data.total_filtered_item_count;
    } else {
      this.entry = 20;
    }
    this.temptotalPages = this.bonusList.data.total_filtered_item_count / 20;
    if (Number.isInteger(this.temptotalPages) == false) {
      this.temptotalPages += 1;
    }
    this.totalPages = parseInt(this.temptotalPages.toFixed(1));
    this.beforeLastPages = this.totalPages - 1;
    this.is_loading = false;
    await this.dismissLoadingView();
  }

  async purchasePackage() {
    try {
      this.entry2 = this.form.value.bef_name;
      // this.buyingPackage = true;
      this.showLoadingView();
      const result = await this.seedServ.depositUSDT(this.form.value.bef_name);
      if (result.success) {
        this.paymentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          result.payment_url
        );

        this.dismissLoadingView();
      }
    } catch (e) {
      console.log(e);
      this.showToast(e.error.message, 3000, 'top', 'error');
      this.dismissLoadingView();
      // this.buyingPackage = false;
    }
    this.form.reset();
  }

  async withdrawUSDT() {
    this.usdtWithdrawForm
      .get('amount')
      .patchValue(this.usdtOTPForm.get('amount').value);
    if (this.usdtWithdrawForm.valid) {
      try {
        const result: any = await this.usdtServ.withdrawConfirm(
          this.usdtWithdrawForm.get('otp_code').value,
          Number(this.usdtWithdrawForm.get('amount').value),
          this.usdtWithdrawForm.get('request_token').value
        );
        this.showToast(this.translate.instant('USDT_WITHDRAW_SUCCESS'));
        setTimeout(() => {
          this.dismissModal();
        }, 1000);
      } catch (e) {
        this.showToast(e.error.message, null, null, 'error');
      }
    } else {
      this.showToast(
        this.translate.instant('PLEASE_ENTER_A_VALID'),
        null,
        null,
        'error'
      );
    }
  }

  otpValueChange(ev) {
    this.usdtWithdrawForm.get('otp_code').patchValue(ev.target.value);
  }

  async requestOTP() {
    if (this.usdtOTPForm.valid) {
      try {
        const result: any = await this.usdtServ.withdrawOTP(
          this.usdtOTPForm.get('amount').value,
          this.usdtOTPForm.get('wallet_address').value
        );
        this.otpDisabled = true;
        this.countdownTimer();
        this.otp_duration = Number(result.data.otp_code_expiry_seconds_left);
        this.usdtWithdrawForm
          .get('request_token')
          .patchValue(result.data.request_token);
      } catch (e) {
        this.showToast(e.error.message, null, null, 'error');
      }
    } else {
      this.showToast(
        this.translate.instant('USDT_WITHDRAW_ERROR'),
        null,
        null,
        'error'
      );
    }
  }

  countdownTimer() {
    this.interval = setInterval(() => {
      if (this.otp_duration > 0) {
        this.otp_duration--;
        document.getElementById('otp_btn').innerHTML = String(
          this.otp_duration
        );
      } else {
        clearInterval(this.interval);
        this.otpDisabled = false;
        document.getElementById('otp_btn').innerHTML =
          this.translate.instant('SEND_OTP');
      }
    }, 1000);
  }

  getTxnType(id) {
    switch (id) {
      case 1:
        return this.translate.instant('DEPOSIT');
      case 2:
        return this.translate.instant('WITHDRAW');
      case 3:
        return this.translate.instant('TRANSFER_FEE');
      case 4:
        return this.translate.instant('REPLANT_FEE');
      case 5:
      case 91:
        return this.translate.instant('OTHER_DEDUCTIONS');
    }
  }

  dismissModal() {
    this.modalCtrl.dismiss();
    this.paymentUrl = '';
    this.isDepositOpen = false;
    this.isWithdrawOpen = false;
    this.form.reset();
    this.testServ.ngOnInit();
    this.ngOnInit();
    this.dismissLoadingView();
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  lessPage() {
    if (this.page > 1) {
      this.page -= 1;
      this.entry -= 20;
      this.adjustTableView();
    }
    if (this.page == this.beforeLastPages) {
      this.entry = this.beforeLastEnrty;
    }
  }

  async addPage() {
    if (this.page < this.totalPages) {
      if (this.page == this.beforeLastPages) {
        this.beforeLastEnrty = this.entry;
      }
      this.page += 1;
      if (this.page == this.totalPages) {
        this.entry = this.totalEntry;
      } else {
        this.entry += 20;
      }
      await this.adjustTableView();
    }
  }

  async updateSortBy(item) {
    let otherTH = document.querySelectorAll('[id^=arrows_usdt_]');
    let clickedTH = document.getElementById('arrows_usdt_' + item);

    if (this.sortBy == item) {
      this.sortDesc = !this.sortDesc;
    } else {
      this.sortDesc = true;
    }
    this.sortBy = item;

    Array.from(otherTH).forEach((th) => {
      if (th !== clickedTH) {
        th.setAttribute('hidden', 'true');
      } else {
        th.removeAttribute('hidden');
      }
    });

    await this.adjustTableView();
    this.page = 1;
    this.entry = 20;

    if (this.sortDesc == true) {
      clickedTH.setAttribute('name', 'caret-down-outline');
    } else {
      clickedTH.setAttribute('name', 'caret-up-outline');
    }
  }

  async rangeChange(range) {
    this.is_loading = true;
    this.page = 1;
    this.entry = 20;
    this.range_selected = range;
    if (this.range_selected == 1) {
      this.date_start = moment().format('YYYY-MM-DD');
    }
    if (this.range_selected == 2) {
      this.date_start = this.yesterdayDate;
    }
    if (this.range_selected == 7) {
      this.date_start = this.sevendayDate;
    }
    if (this.range_selected == 30) {
      this.date_start = this.thirtydayDate;
    }
    if (this.range_selected == 60) {
      this.date_start = this.sixtydayDate;
    }
    if (this.range_selected == 90) {
      this.date_start = this.ninetydayDate;
    }
    this.currentDate = moment().format('YYYY-MM-DD');

    if (this.range_selected == null) {
      this.date_start = null;
      this.currentDate = null;
    }

    await this.adjustTableView();
  }

  async changePage(page) {
    this.page = page;
    await this.adjustTableView();
  }
}
