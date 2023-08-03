import { environment } from 'src/environments/environment';
import { AnnouncementComponent } from './../../announcement/announcement.component';
import { Router } from '@angular/router';
import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { BasePage } from '../../base-page/base-page';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BasePage implements OnInit {
  public form: FormGroup;
  public forgetpasswordform: FormGroup;
  submitted = false;
  otp_duration = 0;
  otp_available = true;
  timerLeft = '';
  expiry_seconds_left = '';
  submitforget = false;

  constructor(
    injector: Injector,
    public authService: AuthService,
    public translate: TranslateService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    super(injector);
  }

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      // password_confirm: new FormControl('', Validators.required),
      // email: new FormControl('', Validators.required)
    });
    this.forgetpasswordform = new FormGroup({
      //login: new FormControl('', Validators.required),
      otp_code: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password_confirm: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }

  async otpCode() {
    // this.submitted = true;
    try {
      await this.showLoadingView();
      const result: UserModel = await (
        await this.authService.sendOTP(this.forgetpasswordform.value.email)
      ).toPromise();
      // this.submitted = false;
      if (result.success) {
        this.otp_available = false;
        this.otp_duration = Number(result.otp_code.expiry_seconds_left);
        // console.log(this.otp_duration);
        this.countdownTimer();
      } else {
        this.otp_available = true;
        this.otp_duration = Number(result.otp_code.expiry_seconds_left);
        // console.log(this.otp_duration);
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
      this.otp_available = true;
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

  async onForgetPassword() {
    this.submitforget = true;
    // console.log('testing');
    try {
      await this.showLoadingView();
      if (this.forgetpasswordform.invalid) {
        const message = await this.getTrans('INVALID_FORM');
        this.dismissLoadingView();
        return this.showToast(message, 3000, 'top', 'warning');
      }

      const result: UserModel = await (
        await this.authService.changeForgotPassword(
          this.forgetpasswordform.value.otp_code,
          this.forgetpasswordform.value.password,
          this.forgetpasswordform.value.password_confirm,
          this.forgetpasswordform.value.email
        )
      ).toPromise();
      // console.log(result);
      this.submitforget = false;
      if (result.success) {
        // console.log(result);
        this.showToast(
          await this.getTrans('PASSWORD_SUCCESSFUL_UPDATED'),
          3000,
          'top',
          'success'
        );
        this.onDismiss();
      } else {
        this.showToast(result.message, 3000, 'top', 'error');
      }
      this.dismissLoadingView();
    } catch (err) {
      this.submitforget = false;
      this.showToast(
        err.error.invalid_errors
          ? err.error.invalid_errors[0]
          : err.error.message,
        3000,
        'top',
        'error'
      );
      this.dismissLoadingView();
      // console.log(err);
    }
  }

  async onLogin() {
    this.submitted = true;

    try {
      await this.showLoadingView();
      if (this.form.invalid) {
        const message = await this.getTrans('INVALID_FORM');
        this.dismissLoadingView();
        return this.showToast(message, 3000, 'top', 'warning');
      }
      const result: UserModel = await (
        await this.authService.userLogin(this.form.value)
      ).toPromise();
      this.submitted = false;
      if (result.success) {
        if (result.user.is_verified) {
          this.showToast(
            await this.getTrans('SUCCESSFULLY_LOGIN'),
            3000,
            'top',
            'success'
          );
          this.router.navigateByUrl('/home');
          this.showAnnouncement(result.user.country_id);
        } else {
          const result: UserModel = await (
            await this.authService.requestOTP()
          ).toPromise();
          // this.router.navigate(['/otp', { otp_duration: 180 }]);
          if (result.success) {
            this.router.navigate([
              '/otp',
              { otp_duration: result.otp_code.expiry_seconds_left },
            ]);
            this.showToast(
              await this.translate.instant('OTP_CODE_SUCCESSFULY'),
              3000,
              'top',
              'success'
            );
          } else {
            this.showToast(result.message, 3000, 'top', 'error');
          }
        }
      } else {
        this.showToast(result.message, 3000, 'top', 'error');
      }
      this.dismissLoadingView();
    } catch (err) {
      this.submitted = false;
      console.log(err);
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

  async showAnnouncement(countryId) {
    const defaultLang = !!localStorage.getItem('ef2_lang')
      ? localStorage.getItem('ef2_lang')
      : 'en';

    const modal = await this.modalCtrl.create({
      component: AnnouncementComponent,
      componentProps: {
        modalTitle: await this.getTrans('ANNOUNCEMENT'),
        modalUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
          environment.announcementUrl +
            `?lang=${defaultLang}#googtrans(defaultLang)` +
            `&country_id=${countryId}`
        ),
      },
      cssClass: 'announcementModal',
    });
    modal.onDidDismiss().then(() => {});
    return await modal.present();
  }
}
