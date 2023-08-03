import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class USDTService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  async withdrawOTP(amount, address) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    const postRequest = {
      amount: amount,
      wallet_address: address,
    };
    return this.http
      .post(
        `${environment.serverUrl}/api/usdt/withdrawal/request-otp`,
        postRequest,
        httpOptions
      )
      .toPromise();
  }

  async withdrawConfirm(otp, amount, token) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    const postRequest = {
      otp_code: otp,
      amount: amount,
      request_token: token,
    };
    return this.http
      .post(
        `${environment.serverUrl}/api/usdt/withdrawal/confirm`,
        postRequest,
        httpOptions
      )
      .toPromise();
  }

  getUserToken() {
    return window.localStorage.getItem('ef2_token');
  }

  getUserLang() {
    return !!window.localStorage.getItem('ef2_lang')
      ? window.localStorage.getItem('ef2_lang')
      : 'en';
  }
}
