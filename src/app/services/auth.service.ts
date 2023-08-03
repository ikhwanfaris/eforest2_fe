import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import {
  UserModel,
  UserDetailModel,
  UserUsdtBalanceModel,
} from '../models/user.model';
import { RegistrationModel } from '../models/registration.model';
//import { ChangePasswordModel } from '../models/password.model';
import { LoginModel } from '../models/login.model';
import { StatusModel } from '../models/status.model';
import { CountryModel } from '../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user = new BehaviorSubject<UserModel>(null);
  private _seedBalance = new BehaviorSubject<{ seed_balance: string }>(null);
  private _usdtBalance = new BehaviorSubject<{ usdt_balance: string }>(null);

  constructor(private http: HttpClient) {}

  async userLogin(loginFields: LoginModel): Promise<Observable<UserModel>> {
    const postRequest = {
      login: loginFields.login,
      password: loginFields.password,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Locale': this.getUserLang(),
      }),
    };

    return this.http
      .post<UserModel>(
        `${environment.serverUrl}/api/user/login`,
        postRequest,
        httpOptions
      )
      .pipe(tap(this.setUserData.bind(this)));
  }

  async userRegister(
    registrationFields: RegistrationModel
  ): Promise<Observable<UserModel>> {
    const postRequest = {
      username: registrationFields.username,
      email: registrationFields.email,
      country: registrationFields.country,
      password: registrationFields.password,
      password_confirmation: registrationFields.password_confirmation,
      fullname: registrationFields.fullname,
      upline_username: registrationFields.upline_username,
      source_how: registrationFields.source_how,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Locale': this.getUserLang(),
      }),
    };

    return this.http
      .post<UserModel>(
        `${environment.serverUrl}/api/user/register`,
        postRequest,
        httpOptions
      )
      .pipe(tap(this.setUserData.bind(this)));
  }

  async changePassword(
    curr_password: string,
    password: string,
    password_confirm: string
  ): Promise<Observable<UserModel>> {
    const postRequest = {
      //email: changePasswordFields.email,
      //otp_code: changePasswordFields.otp_code,
      curr_password: curr_password,
      password: password,
      password_confirm: password_confirm,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };

    return this.http.post<UserModel>(
      `${environment.serverUrl}/api/user/update`,
      postRequest,
      httpOptions
    );
    // .pipe(tap(this.setUserData.bind(this)));
  }

  async updateUserDetails(fullname: string) {
    const postRequest = {
      fullname: fullname,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };

    return this.http.post<UserModel>(
      `${environment.serverUrl}/api/user/update`,
      postRequest,
      httpOptions
    );
  }

  // Forget Password
  async changeForgotPassword(
    otp_code: number,
    password: string,
    password_confirm: string,
    email: string
  ): Promise<Observable<UserModel>> {
    const postRequest = {
      otp_code: otp_code,
      password: password,
      password_confirm: password_confirm,
      email: email,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'X-Locale': this.getUserLang(),
      }),
    };

    return this.http.post<UserModel>(
      `${environment.serverUrl}/api/user/forgot-password/change`,
      postRequest,
      httpOptions
    );
  }

  // Request OTP for FOrget Password
  async sendOTP(email: string): Promise<Observable<UserModel>> {
    const postRequest = {
      email: email,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'X-Locale': this.getUserLang(),
      }),
    };

    return this.http.post<UserModel>(
      `${environment.serverUrl}/api/user/forgot-password/request-otp`,
      postRequest,
      httpOptions
    );
  }

  async userVerify(otpFields: number): Promise<Observable<UserModel>> {
    const postRequest = {
      otp_code: otpFields,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };

    return this.http
      .post<UserModel>(
        `${environment.serverUrl}/api/user/register/verify`,
        postRequest,
        httpOptions
      )
      .pipe(tap(this.setUserData.bind(this)));
  }

  async userLogout() {
    const postRequest = {};

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };

    return this.http.post<StatusModel>(
      `${environment.serverUrl}/api/user/logout`,
      postRequest,
      httpOptions
    );
  }

  async requestOTP(): Promise<Observable<UserModel>> {
    const postRequest = {};

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };

    return this.http.post<UserModel>(
      `${environment.serverUrl}/api/user/register/request-otp`,
      postRequest,
      httpOptions
    );
  }

  async userDetails() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    // return
    var a = this.http
      .get<UserModel>(`${environment.serverUrl}/api/user`, httpOptions)
      .toPromise();
    // .pipe(tap(this.setUserData.bind(this)));
    this.setUserData(await a);
  }

  async usdtBalance() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    const result = this.http
      .get<UserUsdtBalanceModel>(
        `${environment.serverUrl}/api/user/wallet-balance`,
        httpOptions
      )
      .toPromise();
    this._usdtBalance.next({ usdt_balance: (await result).usdt_balance });
    return result;
    // .pipe(tap(this.setUserData.bind(this)));
  }
  //get Country List
  async getCountryList() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http
      .get(`${environment.serverUrl}/api/countries`, httpOptions)
      .toPromise();
  }

  //Get My Community
  async getMyCommunity(page: number) {
    //console.log(user_id);
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http
      .get<UserDetailModel>(
        `${environment.serverUrl}/api/user/my-community?itemsPerPage=20&page=` +
          page,
        httpOptions
      )
      .toPromise();
  }

  //Get My Direct
  async getMyDirect(page: number) {
    //console.log(user_id);
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http
      .get<UserDetailModel>(
        `${environment.serverUrl}/api/user/my-direct?itemsPerPage=20&page=` +
          page,
        httpOptions
      )
      .toPromise();
  }

  getSeedBalance() {
    const userDetails: UserDetailModel = JSON.parse(this.getUserDetails());

    if (userDetails) {
      this._seedBalance.next({ seed_balance: userDetails.seed_balance });
    }
    return this._seedBalance;
  }

  geUSDTBalance() {
    return this._usdtBalance;
  }

  setUserData(resData: UserModel) {
    // console.log("resData");
    // console.log(resData);
    if (resData.access_token) {
      window.localStorage.setItem('ef2_token', resData.access_token);
    }
    if (resData.user) {
      window.localStorage.setItem('ef2_user', JSON.stringify(resData.user));
    }
    if (resData.team) {
      window.localStorage.setItem('ef2_team', JSON.stringify(resData.team));
    }
  }

  getUserToken() {
    const a = window.localStorage.getItem('ef2_token');
    // console.log(a);
    return window.localStorage.getItem('ef2_token');
  }

  getUserDetails() {
    var test = window.localStorage.getItem('ef2_user');
    console.log(test);
    return window.localStorage.getItem('ef2_user');
  }
  getUserTeamDetails() {
    var test = window.localStorage.getItem('ef2_team');
    // console.log(test);
    return window.localStorage.getItem('ef2_team');
  }

  removeUserToken() {
    return window.localStorage.removeItem('ef2_token');
  }

  removeUserDetails() {
    return window.localStorage.removeItem('ef2_user');
  }

  getUserLang() {
    return !!window.localStorage.getItem('ef2_lang')
      ? window.localStorage.getItem('ef2_lang')
      : 'en';
  }
}
