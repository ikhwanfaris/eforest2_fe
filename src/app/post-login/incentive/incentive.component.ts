import { IncentivesService } from './../../services/incentives.service';
import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { ScoreboardItems } from 'src/app/enums/enums';

@Component({
  selector: 'app-incentive',
  templateUrl: './incentive.component.html',
  styleUrls: ['./incentive.component.scss'],
})
export class IncentiveComponent extends BasePage implements OnInit {
  // isLoading = true;
  scoreBoardItem = ScoreboardItems;
  scoreBoardSelected = ScoreboardItems.TOP_SALES;
  incentivesList = [];
  customAlertOptions = {
    header: this.translate.instant('SCOREBOARDS'),
    // subHeader: '',
    // message: 'Choose only one',
    translucent: true,
  };
  currentPage = 1;

  constructor(private incentivesServ: IncentivesService, injector: Injector) {
    super(injector);
  }

  async ngOnInit() {
    this.showLoadingView();
    try {
      const result = await this.incentivesServ.getSeptIncentives();
      this.incentivesList = result.users;
    } catch (e) {
      this.showToast(e.error.message, 3000, 'top', 'error');
    }
    await this.dismissLoadingView();
  }

  async getTopBuddies() {
    this.showLoadingView();
    
    try {
      const buddies = await this.incentivesServ.getTopSeptBuddy();
      //this.incentivesList = buddies.result;
    } catch (e) {
      this.showToast(e.error.message, 3000, 'top', 'error');
    }
    await this.dismissLoadingView();
  }

  async getTop10k() {
    this.showLoadingView();
    try {
      const buddies10k = await this.incentivesServ.getBuddy10k(1);
      this.incentivesList = buddies10k.result;
      this.incentivesList.push({
        userId: 3,
        username: 'eforest3',
        NoOfL1Buddies: 3,
      });
    } catch (e) {
      this.showToast(e.error.message, 3000, 'top', 'error');
    }
    await this.dismissLoadingView();
  }

  changePage(symbol) {
    if (symbol == '-') {
      if (this.currentPage !== 1) {
        this.currentPage--;
      }
    } else {
      this.currentPage++;
    }
  }

  scordBoardChange(ev) {
    const selected = ev.detail.value;
    this.scoreBoardSelected = selected;
    this.incentivesList = [];
    switch (selected) {
      case ScoreboardItems.TOP_SALES:
        this.ngOnInit();
        break;
      case ScoreboardItems.TOP_RECRUITERS:
        this.getTopBuddies();
        break;
      case ScoreboardItems.TOP_10K_RECRUITERS:
        this.getTop10k();
        break;
    }
  }
}
