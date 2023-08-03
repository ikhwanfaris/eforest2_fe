import { AuthService } from './../../services/auth.service';
import { AlertController } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { P2pService } from 'src/app/services/p2p.service';
import { Component, OnInit, Injector, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-p2p-history',
  templateUrl: './p2p-history.component.html',
  styleUrls: ['./p2p-history.component.scss'],
})
export class P2pHistoryComponent extends BasePage implements OnInit {
  constructor(
    private p2pServ: P2pService,
    injector: Injector,
    private alertCtrl: AlertController,
    private authService: AuthService
  ) {
    super(injector);
  }
  range_selected = 1;
  @Input() type_selected = 'buy';
  historyList = [];
  entry = 0;
  totalEntry = 0;
  rowPerPage = 10;
  page = 1;
  displayPages = [1];
  sortBy = 'ad_id';
  sortDesc = true;
  createDate;
  endDate;

  async ngOnInit() {
    this.createDate = moment(new Date()).format('YYYY-MM-DD');
    this.endDate = moment(new Date()).format('YYYY-MM-DD');
    this.tableChange();
  }

  async tableChange() {
    await this.showLoadingView();

    try {
      const result = await this.p2pServ.p2pTradeList(
        this.type_selected,
        this.rowPerPage,
        this.page,
        this.sortBy,
        String(this.sortDesc),
        this.createDate,
        this.endDate
      );
      this.historyList = result.data.items;

      this.totalEntry = result.data.total_filtered_item_count;
      this.entry =
        this.historyList.length >= this.rowPerPage
          ? this.rowPerPage
          : this.historyList.length;

      const calc = Math.ceil(this.totalEntry / this.rowPerPage);
      this.displayPages = [1];

      if (calc > 1) {
        for (let i = 2; i <= calc; i++) {
          this.displayPages.push(i);
        }
      }
    } catch (e) {
      this.showToast(e.error.message, 3000, 'top', 'error');
    }
    await this.dismissLoadingView();
  }

  async typeChange(type) {
    this.type_selected = type;
    this.tableChange();
  }

  async rangeChange(range) {
    this.range_selected = range;
    this.createDate = moment(new Date())
      .subtract(range, 'days')
      .format('YYYY-MM-DD');
    this.tableChange();
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  sortTable(n) {
    let otherTH = document.querySelectorAll('[id^=p2p_seeds_]');
    let clickedTH = document.getElementById('p2p_seeds_' + n);

    Array.from(otherTH).forEach((th) => {
      if (th !== clickedTH) {
        th.setAttribute('hidden', 'true');
      } else {
        th.removeAttribute('hidden');
      }
    });

    if (n == this.sortBy) {
      this.sortDesc = this.sortDesc ? false : true;
    } else {
      this.sortBy = n;
      this.sortDesc = true;
    }

    const arrowDir = this.sortDesc ? 'up' : 'down';
    clickedTH.setAttribute('name', `caret-${arrowDir}-outline`);

    this.tableChange();
  }

  lessPage() {
    if (this.page > 1) {
      this.page -= 1;
      this.tableChange();
    }
  }

  addPage() {
    if (this.page < this.displayPages[this.displayPages.length - 1]) {
      this.page += 1;
      this.tableChange();
    }
  }

  changePage(page) {
    this.page = page;
    this.tableChange();
  }

  async cancelTrade(id) {
    const alert = await this.alertCtrl.create({
      header: await this.translate.instant('CANCEL_TRADE_TITLE'),
      message: await this.translate.instant('CANCEL_TRADE_MESSAGE'),
      buttons: [
        {
          text: await this.translate.instant('CANCEL'),
          role: 'cancel',
        },
        {
          text: await this.translate.instant('CONFIRM'),
          role: 'confirm',
          handler: async () => {
            try {
              await this.p2pServ.cancelTrade(id);
              await this.showToast(this.translate.instant('TRADE_CANCELLED'));
              await this.tableChange();
              await this.authService.userDetails().then(() => {
                this.authService.getSeedBalance();
                this.authService.usdtBalance();
              });
            } catch (e) {
              console.log(e);
              this.showToast(e.error.message, 3000, 'top', 'error');
            }
          },
        },
      ],
    });
    await alert.present();
  }
}
