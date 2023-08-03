import { Component, Injector, OnInit } from '@angular/core';
import { OrderDataModel } from 'src/app/models/packages.model';
import { PackageService } from 'src/app/services/packages.service';
import { SeedsService } from 'src/app/services/seed.service';
import { BasePage } from '../../base-page/base-page';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDetailModel, UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { TransferSeedDataModel } from 'src/app/models/seeds.model';
import * as moment from 'moment';

@Component({
  selector: 'app-seed-wallet',
  templateUrl: './seed-wallet.component.html',
  styleUrls: ['./seed-wallet.component.scss'],
})
export class SeedWalletComponent extends BasePage implements OnInit {
  transaction_selected = 3;
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
  type_param: string;
  displayPages = [];
  is_loading = true;
  public form: FormGroup;
  otp_duration = 0;
  otp_available = true;
  timerLeft = '';
  expiry_seconds_left = '';
  userDetails: UserDetailModel;
  transferSeedData: TransferSeedDataModel;
  submitted = false;
  date_start: string;
  sortBy: any;
  sortDesc: boolean;

  constructor(
    private seedServ: SeedsService,
    private authService: AuthService,
    injector: Injector
  ) {
    super(injector);
  }

  async ngOnInit() {
    this.form = new FormGroup({
      recipient_username: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      otp_code: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(6),
      ]),
    });
    await this.authService.userDetails();
    this.userDetails = JSON.parse(this.authService.getUserDetails());

    this.is_loading = true;
    this.currentDate = moment().format('YYYY-MM-DD');
    this.date_start = this.currentDate;
    this.yesterdayDate = moment().subtract('days', 1).format('YYYY-MM-DD');
    this.sevendayDate = moment().subtract('days', 7).format('YYYY-MM-DD');
    this.thirtydayDate = moment().subtract('days', 30).format('YYYY-MM-DD');
    this.sixtydayDate = moment().subtract('days', 60).format('YYYY-MM-DD');
    this.ninetydayDate = moment().subtract('days', 90).format('YYYY-MM-DD');

    this.adjustTableView();
  }

  async adjustTableView() {
    await this.showLoadingView();
    this.is_loading = true;
    this.bonusList = await this.seedServ.userTransactionBonus(
      this.page,
      this.date_start,
      this.currentDate,
      this.transaction_selected,
      this.sortBy,
      this.sortDesc
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

    this.dismissLoadingView();
  }

  async transactionChange(type) {
    this.page = 1;
    this.entry = 20;
    this.transaction_selected = type;
    this.adjustTableView();
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

  addPage() {
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
      this.adjustTableView();
    }
  }

  async otpCode() {
    this.submitted = true;
    try {
      await this.showLoadingView();
      // console.log(this.form.value.recipient_username);
      // console.log(this.form.value.amount);
      const result: UserModel = await (
        await this.seedServ.sendOTP(
          this.form.value.recipient_username,
          this.form.value.amount
        )
      ).toPromise();
      this.otp_available = false;
      this.submitted = false;
      if (result.success) {
        //this.otp_available = false;
        this.otp_duration = Number(result.otp_code.expiry_seconds_left);
        // console.log('xxx');
        this.countdownTimer();
      } else {
        this.otp_available = true;
        this.otp_duration = Number(result.otp_code.expiry_seconds_left);
        // console.log('yyy');
        this.showToast(result.message, 3000, 'top', 'error');
      }
      this.dismissLoadingView();
    } catch (err) {
      this.showToast(
        err.error.invalid_errors
          ? err.error.invalid_errors[0]
          : err.error.message,
        3000,
        'top',
        'error'
      );
      this.dismissLoadingView();
      //console.log(err);
    }
  }

  countdownTimer() {
    setTimeout(() => {
      this.otp_available = false;
    }, this.otp_duration * 1000);

    const interval = setInterval(() => {
      if (this.otp_duration > 0) {
        this.otp_duration--;
        this.timerLeft = this.minutePipe(this.otp_duration);
        // console.log(this.timerLeft);
      } else {
        clearInterval(interval);
        this.otp_available = true;
      }
    }, 1000);
  }

  minutePipe(duration) {
    let minutes: any = Math.floor(duration / 60);
    let seconds: any = duration - minutes * 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return `${minutes} minutes ${seconds} seconds`;
  }

  async transferSeed() {
    this.submitted = true;
    try {
      await this.showLoadingView();
      if (this.form.invalid) {
        const message = await this.getTrans('INVALID_FORM');
        this.dismissLoadingView();
        return this.showToast(message, 3000, 'top', 'warning');
      }
      const result: TransferSeedDataModel = await (
        await this.seedServ.transferSeed(
          this.form.value.amount,
          this.form.value.recipient_username,
          this.form.value.otp_code
        )
      ).toPromise();
      this.submitted = false;
      // console.log(result);
      if (result.success) {
        this.showToast(
          await this.getTrans('SUCCESS_TRANSFER'),
          3000,
          'top',
          'success'
        );
        this.dismissLoadingView();
        this.onDismiss();
        this.ngOnInit();
      } else {
        // this.onDismiss();
        this.showToast(result.message, 3000, 'top', 'error');
      }
      this.dismissLoadingView();
    } catch (err) {
      this.showToast(
        err.error.invalid_errors
          ? err.error.invalid_errors[0]
          : err.error.message,
        3000,
        'top',
        'error'
      );
      this.dismissLoadingView();
      // this.onDismiss();
      console.log(err);
    }
  }
  onDismiss() {
    this.form.reset();
    this.submitted = false;
    this.otp_available = true;
    this.authService.userDetails().then(() => {
      this.authService.getSeedBalance();
      this.authService.usdtBalance();
    });
    this.modalCtrl.dismiss();
    //  this.ngOnInit();
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  sortTable(n) {
    var table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;
    table = document.getElementById('seedsTable');
    switching = true;
    // Set the sorting direction to ascending:
    dir = 'asc';
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < rows.length - 1; i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName('TD')[n];
        y = rows[i + 1].getElementsByTagName('TD')[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        let xValue = x.innerHTML.toLowerCase();
        let yValue = y.innerHTML.toLowerCase();

        switch (n) {
          case 0:
            xValue = new Date(x.innerHTML);
            yValue = new Date(y.innerHTML);
            break;
          case 1:
          case 4:
          case 5:
            xValue = x.innerHTML;
            yValue = y.innerHTML;
            break;
          case 2:
          case 3:
            parseFloat(x.innerHTML.replace(/,/g, ''));
            xValue = parseFloat(x.innerHTML.replace(/,/g, ''));
            yValue = parseFloat(y.innerHTML.replace(/,/g, ''));
            break;
        }

        let clickedTH = document.getElementById('arrows_seeds_' + n);

        if (dir == 'asc') {
          clickedTH.setAttribute('name', 'caret-down-outline');
          if (xValue > yValue) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == 'desc') {
          clickedTH.setAttribute('name', 'caret-up-outline');
          if (xValue < yValue) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      let otherTH = document.querySelectorAll('[id^=arrows_seeds_]');
      let clickedTH = document.getElementById('arrows_seeds_' + n);

      Array.from(otherTH).forEach((th) => {
        // console.log(th);
        if (th !== clickedTH) {
          th.setAttribute('hidden', 'true');
        } else {
          th.removeAttribute('hidden');
        }
      });

      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == 'asc') {
          dir = 'desc';
          switching = true;
        }
      }
    }
  }

  async updateSortBy(item) {
    let otherTH = document.querySelectorAll('[id^=arrows_seeds_]');
    let clickedTH = document.getElementById('arrows_seeds_' + item);

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

  async changePage(page) {
    this.page = page;
    await this.adjustTableView();
  }
}
