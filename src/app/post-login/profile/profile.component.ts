import { AuthService } from './../../services/auth.service';
import {
  Component,
  OnInit,
  Injector,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TeamDetailModel, UserDetailModel } from 'src/app/models/user.model';
import { UserModel } from '../../models/user.model';
import { BasePage } from 'src/app/base-page/base-page';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReferralComponent } from '../referral/referral.component';
import { ProfileService } from 'src/app/services/profile.service';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import * as moment from 'moment';
import { BeneficiaryComponent } from '../beneficiary/beneficiary.component';
import { IonInput } from '@ionic/angular';
import { EarningComponent } from '../earning-limit/earning-limit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends BasePage implements OnInit {
  public form: FormGroup;
  submitted = false;
  userDetails: UserDetailModel;
  teamDetails: TeamDetailModel;
  joinDate;
  downlineOne;
  downlineTwo;
  teamInfo;
  totalDownlineTwo: number;
  showDataOne: boolean = false;
  showDataTwo: boolean = false;
  showData: boolean = false;
  displayedColumns: string[] = [
    'fullname',
    'username',
    'email',
    'country',
    'status',
  ];
  public profileForm: FormGroup;
  updateProfileSubmitted = false;
  @ViewChild('fullName') fullNameInput: IonInput;

  dataSource = new MatTableDataSource();
  dataSourceTwo = new MatTableDataSource();

  @ViewChild(MatSort) set sort(sort: MatSort) {
    if (!this.dataSource.sort) {
      this.dataSource.sort = sort;
    }
  }
  constructor(
    private authService: AuthService,
    injector: Injector,
    private profileService: ProfileService
  ) {
    super(injector);
  }

  async ngOnInit() {
    this.form = new FormGroup({
      curr_password: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password_confirm: new FormControl('', Validators.required),
    });
    this.profileForm = new FormGroup({
      fullname: new FormControl(''),
    });

    await this.authService.userDetails();
    this.userDetails = JSON.parse(this.authService.getUserDetails());

    this.joinDate = moment
      .unix(Number(this.userDetails.joined_at_timestamp))
      .format('D MMM YYYY');

    if (this.fullNameInput) {
      if (this.userDetails.fullname) {
        this.profileForm.get('fullname').patchValue(this.userDetails.fullname);
      }
      this.fullNameInput.readonly = true;
    }
  }

  async onReferralInfoButton() {
    const modal = await this.modalCtrl.create({
      component: ReferralComponent,
      cssClass: 'referral-modal-container',
      componentProps: {
        showpersonalinfo: true,
      },
    });
    modal.onDidDismiss().then(() => {});
    return await modal.present();
  }

  async onBeneficiaryButton() {
    const modal = await this.modalCtrl.create({
      component: BeneficiaryComponent,
      cssClass: 'beneficiary-modal-container',
      componentProps: {
        showpersonalinfo: true,
      },
    });
    modal.onDidDismiss().then(() => {});
    return await modal.present();
  }
  async onAlertButton() {
    const modal = await this.modalCtrl.create({
      component: EarningComponent,
      cssClass: 'beneficiary-modal-container',
      componentProps: {
        showpersonalinfo: true,
      },
    });
    modal.onDidDismiss().then(() => {});
    return await modal.present();
  }

  async onRegister() {
    this.submitted = true;
    try {
      await this.showLoadingView();
      if (this.form.invalid) {
        const message = await this.getTrans('INVALID_FORM');
        this.dismissLoadingView();
        return this.showToast(message, 3000, 'top', 'warning');
      }

      const result: UserModel = await (
        await this.authService.changePassword(
          this.form.value.curr_password,
          this.form.value.password,
          this.form.value.password_confirm
        )
      ).toPromise();
      this.submitted = false;
      if (result.success) {
        //this.router.navigate(['/otp', {otp_duration: result.otp_code.expiry_seconds_left}]);
        this.showToast(
          await this.getTrans('PASSWORD_SUCCESSFULLY_UPDATED'),
          3000,
          'top',
          'success'
        );
        this.dismissLoadingView();
        //this.model.onDismiss();
        this.onDismiss();
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

  async updateUser() {
    this.updateProfileSubmitted = true;
    try {
      await this.showLoadingView();
      if (this.profileForm.invalid) {
        const message = await this.getTrans('INVALID_FORM');
        this.dismissLoadingView();
        if (this.userDetails.fullname) {
          this.profileForm
            .get('fullname')
            .patchValue(this.userDetails.fullname);
        }
        return this.showToast(message, 3000, 'top', 'warning');
      }

      const result: UserModel = await (
        await this.authService.updateUserDetails(
          this.profileForm.value.fullname
        )
      ).toPromise();
      this.updateProfileSubmitted = false;
      if (result.success) {
        //this.router.navigate(['/otp', {otp_duration: result.otp_code.expiry_seconds_left}]);
        this.showToast(
          await this.getTrans('PROFILE_SUCCESSFULLY_UPDATED'),
          3000,
          'top',
          'success'
        );
        await this.authService.userDetails();
        this.userDetails = JSON.parse(this.authService.getUserDetails());
        this.dismissLoadingView();
      } else {
        // this.onDismiss();
        this.showToast(result.message, 3000, 'top', 'error');
      }
      this.dismissLoadingView();
    } catch (err) {
      this.updateProfileSubmitted = false;
      this.showToast(
        err.error.invalid_errors
          ? err.error.invalid_errors[0]
          : err.error.message,
        3000,
        'top',
        'error'
      );
      if (this.userDetails.fullname) {
        this.profileForm.get('fullname').patchValue(this.userDetails.fullname);
      }
      this.dismissLoadingView();
      // this.onDismiss();
      console.log(err);
    }
  }

  editName(readOnly: boolean) {
    const fullNameitem = document.getElementById('fullNameItem');
    fullNameitem.classList.remove('input_readonly');
    if (readOnly) {
      fullNameitem.classList.add('input_readonly');
      this.updateUser();
    }
  }
}
export interface Element {
  username: string;
  user_id: number;
}
