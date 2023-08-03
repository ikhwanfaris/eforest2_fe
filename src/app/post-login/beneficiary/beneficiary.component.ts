import { Component, OnInit, Injector } from '@angular/core';
import { BasePage } from '../../base-page/base-page';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { BeneficiaryModel } from 'src/app/models/user.model';
@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.scss'],
})
export class BeneficiaryComponent extends BasePage implements OnInit {
  public form: FormGroup;
  submitted = false;
  beneficiaryInfo: any;

  constructor(injector: Injector, private profileService: ProfileService) {
    super(injector);
  }

  async ngOnInit() {
    this.form = new FormGroup({
      bef_name: new FormControl('', Validators.required),
      bef_email: new FormControl('', Validators.required),
      bef_mobile: new FormControl('', Validators.required),
      bef_id_no: new FormControl('', Validators.required),
    });
    this.beneficiaryInfo = await this.profileService.getBeneficiaryInfo();
    // console.log(this.beneficiaryInfo);
    if (!!this.beneficiaryInfo) {
      this.form.patchValue(this.beneficiaryInfo.user_beneficiary);
    }
  }
  async onUpdate() {
    this.submitted = true;
    try {
      await this.showLoadingView();
      // console.log(this.form.value);
      const result: BeneficiaryModel = await (
        await this.profileService.updateBeneficiaryInfo(this.form.value)
      ).toPromise();
      // console.log(result);
      this.submitted = false;
      if (result.success) {
        this.showToast(
          await this.getTrans('BENEFICIARY_SUCCESSFULLY_UPDATED'),
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
}
