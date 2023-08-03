import { Component, OnInit, Injector } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BasePage } from '../../base-page/base-page';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { CountryModel } from 'src/app/models/country.model';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends BasePage implements OnInit {
  public form: FormGroup;
  submitted = false;
  referral = null;
  toggleBool: boolean;

  public countryList: CountryModel[] = [];
  selectedCountry;

  constructor(
    injector: Injector,
    public authService: AuthService,
    private router: Router,
    private actRoute: ActivatedRoute,
    public translate: TranslateService
  ) {
    super(injector);
  }

  async ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        this.noWhitespaceValidator,
      ]),
      email: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password_confirmation: new FormControl('', Validators.required),
      // fullname: new FormControl('', Validators.required),
      upline_username: new FormControl('',Validators.required),
      source_how: new FormControl('', Validators.required),
    });

    this.toggleBool = true;
    this.setupCountry();
    if (
      this.actRoute.snapshot.params &&
      this.actRoute.snapshot.params.referral
    ) {
      this.referral = this.actRoute.snapshot.params.referral;
      this.form.get('upline_username').patchValue(this.referral);
    }
  }
  async setupCountry() {
    const result = await this.authService.getCountryList();
    this.countryList = result['data'];
  }
  updateform() {
    if (this.selectedCountry) {
      const countryForm = this.form.get('country');
      countryForm.setValue(this.selectedCountry);
    }
  }
  onCountryChanged(event: any) {
    try {
      this.selectedCountry = <CountryModel>event.detail.value;
      this.updateform();
    } catch (error) {
      console.warn(error.message);
    }
  }

  changeEvent(event) {
    // console.log(event);
    // if (event.target.checked) {

    //     this.toggleBool= false;
    // }
    // else {
    //     this.toggleBool= true;
    // }
    // console.log(checkbox)
    this.toggleBool = !this.toggleBool;
  }

  async onRegister() {
    this.submitted = true;
    try {
      await this.showLoadingView();
      if (this.form.invalid) {
        const message = await this.getTrans('PLEASE_FILL_REQUIRED');
        this.dismissLoadingView();
        return this.showToast(message, 3000, 'top', 'warning');
      }
      // console.log(this.form.value);
      const result: UserModel = await (
        await this.authService.userRegister(this.form.value)
      ).toPromise();
      this.submitted = false;
      if (result.success) {
        this.router.navigate([
          '/otp',
          { otp_duration: result.otp_code.expiry_seconds_left },
        ]);
        this.showToast(
          await this.translate.instant('OTP_CODE_SUCCESSFULLY'),
          3000,
          'top',
          'success'
        );
      } else {
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
      console.log(err);
    }
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = String(control.value).includes(' ');
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
}
