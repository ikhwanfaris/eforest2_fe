import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BasePage } from '../../base-page/base-page';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent extends BasePage implements OnInit {
  public form: FormGroup;
  submitted = false;
  otp_duration = 0;
  otp_available = false;
  timerLeft = '';
  constructor(
    injector: Injector,
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    public router: Router
  ) {
    super(injector);
  }

  ngOnInit() {
    this.otp_duration = Number(this.actRoute.snapshot.params.otp_duration);
    this.countdownTimer();
    this.form = new FormGroup({
      otp_code: new FormControl('', Validators.required),
    });
  }

  async sendOTP() {
    this.submitted = true;
    try {
      await this.showLoadingView();
      if (this.form.invalid) {
        const message = await this.getTrans('INVALID_FORM');
        this.dismissLoadingView();
        return this.showToast(message, 3000, 'top', 'warning');
      }

      const result: UserModel = await (
        await this.authService.userVerify(this.form.value.otp_code)
      ).toPromise();
      this.submitted = false;
      if (result.success) {
        this.router.navigateByUrl('/login');
        this.showToast(await this.getTrans('SUCCESSFULLY_VERIFIED'), 3000, 'top', 'success');
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

  async resendOTP() {
    try {
      const result: UserModel = await (
        await this.authService.requestOTP()
      ).toPromise();
      // console.log(result);
      if (result.success) {
        this.otp_available = false;
        this.otp_duration = result.otp_code.expiry_seconds_left;
        this.countdownTimer();
        this.showToast(
          await this.translate.instant('OTP_CODE_SUCCESSFULY'),
          3000,
          'top',
          'success'
        );
      } else {
        this.showToast(result.message, 3000, 'top', 'error');
      }
    } catch (e) {
      console.log(e);
      this.otp_available = false;
      this.otp_duration = e.error.otp_code.expiry_seconds_left;
      this.countdownTimer();
      this.showToast(e.error.message, 3000, 'top', 'error');
    }
  }

  countdownTimer() {
    // console.log(this.otp_available);
    setTimeout(() => {
      this.otp_available = true;
    }, this.otp_duration * 1000);

    const interval = setInterval(() => {
      if (this.otp_duration > 0) {
        this.otp_duration--;
        this.timerLeft = this.minutePipe(this.otp_duration);
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
}
