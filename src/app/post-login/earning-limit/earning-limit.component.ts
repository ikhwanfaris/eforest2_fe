import { Component, OnInit, Injector } from '@angular/core';
import { BasePage } from '../../base-page/base-page';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { BeneficiaryModel, EarningLimitModel, UserDetailModel } from 'src/app/models/user.model';

import { RangeValue } from '@ionic/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-earning-limit',
  templateUrl: './earning-limit.component.html',
  styleUrls: ['./earning-limit.component.scss'],
})
export class EarningComponent extends BasePage implements OnInit {

  submitted = false;
  beneficiaryInfo: any;
  lastEmittedValue: RangeValue;
  userDetails: UserDetailModel;
  moveStart: RangeValue;

  constructor(
    injector: Injector, 
    private profileService: ProfileService,
    private authService: AuthService,) {
    super(injector);
  }

  async ngOnInit() {
    this.lastEmittedValue = 0;
    await this.authService.userDetails();
    this.userDetails = JSON.parse(this.authService.getUserDetails());
      if(this.userDetails.alert_pct != 0 ){
        this.lastEmittedValue = this.userDetails.alert_pct
        this.pinFormatter(this.lastEmittedValue)
        this.moveStart = this.lastEmittedValue;
      }
   
  }
  async onUpdate() {
    console.log(this.lastEmittedValue);
    this.submitted = true;
    try {
      await this.showLoadingView();
      // console.log(this.form.value);
      const result: EarningLimitModel = await (
        await this.profileService.setEarningLimit(this.lastEmittedValue)
      ).toPromise();
      // console.log(result);
      this.submitted = false;
      if (result.success) {
        this.showToast(
          await this.getTrans('EARNING_LIMIT_UPDATED'),
          3000,
          'top',
          'success'
        );
        this.dismissLoadingView();
        //this.model.onDismiss();
        this.onDismiss();
      } 
      // else {
      // this.onDismiss();
      //   this.showToast(result.message, 3000, 'top', 'error');
      // }
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
  pinFormatter(value: number) {
    return `${value}%`;
  }

  onIonChange(ev: Event) {
    this.lastEmittedValue = (ev as CustomEvent).detail.value;
  }

  onIonKnobMoveStart(ev: Event) {
    this.moveStart = (ev as CustomEvent).detail.value;
  }
}
