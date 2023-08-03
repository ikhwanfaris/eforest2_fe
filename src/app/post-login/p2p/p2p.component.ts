import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { BasePage } from 'src/app/base-page/base-page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  Input,
  OnInit,
  Injector,
  Output,
  EventEmitter,
} from '@angular/core';
import { p2pSettings } from 'src/app/static/p2p_settings';
import { P2pService } from 'src/app/services/p2p.service';

@Component({
  selector: 'app-p2p',
  templateUrl: './p2p.component.html',
  styleUrls: ['./p2p.component.scss'],
})
export class P2pComponent extends BasePage implements OnInit {
  @Input() type = 'BUY_SEEDS';
  gemQuantity = p2pSettings.p2pAmount;
  fee_percent = p2pSettings.p2pFee;
  actualReceiving = 0;
  form: FormGroup;
  showOTPModal = false;
  otpDisabled = false;
  otp_duration = 0;
  interval;
  @Output('changePage') changePage: EventEmitter<any> = new EventEmitter();
  constructor(
    public fb: FormBuilder,
    private p2pServ: P2pService,
    injector: Injector,
    private authService: AuthService
  ) {
    super(injector);

    this.form = this.fb.group({
      amount: [null, Validators.required],
      otp_code: [null, Validators.required],
    });
  }

  ngOnInit() {}

  async gemChange(ev) {
    try {
      this.gemAmount.patchValue(ev.detail.value);
      this.actualReceiving =
        this.gemAmount.value * ((100 - this.fee_percent) / 100);
    } catch (e) {
      this.showToast(e.error.message, 3000, 'top', 'error');
    }
  }

  async requestOTP() {
    try {
      const result = await this.p2pServ.p2pRequestOTP(
        this.type === 'BUY_SEEDS' ? 'buy' : 'sell',
        this.gemAmount.value
      );
      this.showOTPModal = true;
      this.otpDisabled = true;
      this.countdownTimer();
      this.otp_duration = Number(result.otp_code.expiry_seconds_left);
      this.showToast(this.translate.instant('OTP_CODE_SUCCESSFULY'));
      // console.log(result);
    } catch (e) {
      this.showToast(e.error.message, 3000, 'top', 'error');
    }
  }

  otpValueChange(ev) {
    this.otpCode.patchValue(ev.target.value);
  }

  countdownTimer() {
    this.interval = setInterval(() => {
      if (this.otp_duration > 0) {
        this.otp_duration--;
        document.getElementById('p2p_otp_btn').innerHTML = String(
          this.otp_duration
        );
      } else {
        clearInterval(this.interval);
        this.otpDisabled = false;
        document.getElementById('p2p_otp_btn').innerHTML =
          this.translate.instant('SEND_OTP');
      }
    }, 1000);
  }

  async startTrade() {
    try {
      const p2pType = this.type === 'BUY_SEEDS' ? 'buy' : 'sell';
      const result = await this.p2pServ.p2pTradeStart(
        p2pType,
        this.gemAmount.value,
        this.otpCode.value
      );
      this.showToast(this.translate.instant('TRADE_START_SUCCESS'));
      this.showOTPModal = false;
      this.otpDisabled = false;
      this.otp_duration = 0;
      this.authService.userDetails().then(() => {
        this.authService.getSeedBalance();
        this.authService.usdtBalance();
      });
      setTimeout(() => {
        this.changePage.emit();
      }, 1000);
    } catch (e) {
      this.showToast(e.error.message, 3000, 'top', 'error');
    }
  }

  get gemAmount() {
    return this.form.get('amount');
  }

  get otpCode() {
    return this.form.get('otp_code');
  }
}
