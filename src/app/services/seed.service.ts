import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { PaymentModel } from '../models/packages.model';

import { UserPlantedModel, TransferSeedDataModel } from '../models/seeds.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel, UserDetailModel } from '../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class SeedsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  async seedTransactionType() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http
      .get(`${environment.serverUrl}/api/transactions/seed/types`, httpOptions)
      .toPromise();
  }

  getUserToken() {
    return window.localStorage.getItem('ef2_token');
  }
  getUserDownLine() {
    return window.localStorage.getItem('eforest_user_downline');
  }

  async userTransactionBonus(
    page: number,
    start_date: string,
    end_date: string,
    type: number,
    sortBy?: string,
    sortDesc?: boolean
  ) {
    var sortDesc = sortDesc ?? true;
    var sortBy = sortBy ?? 'datetime';
    var page = page ?? 1;
    let queryParams = `itemsPerPage=20&sortDesc=${sortDesc}&sortBy=${sortBy}&page=${page}`;

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http
      .get(
        `${environment.serverUrl}/api/transactions/seed?itemsPerPage=20&${queryParams}` +
          '&start_date=' +
          start_date +
          '&end_date=' +
          end_date +
          '&type=' +
          type,
        httpOptions
      )
      .toPromise();
  }

  async userPlantedList() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http
      .get<UserPlantedModel>(
        `${environment.serverUrl}/api/orders/planted`,
        httpOptions
      )
      .toPromise();
  }

  async userNonPlantedList() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http
      .get<UserPlantedModel>(
        `${environment.serverUrl}/api/orders/non-planted`,
        httpOptions
      )
      .toPromise();
  }

  async updateSeedsPlanted(packageRef) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http
      .post<UserPlantedModel>(
        `${environment.serverUrl}/api/orders/${packageRef}/plant`,
        {},
        httpOptions
      )
      .toPromise();
  }

  async updateSeedsGerminate(packageRef) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http
      .post<UserPlantedModel>(
        `${environment.serverUrl}/api/orders/${packageRef}/germinate`,
        {},
        httpOptions
      )
      .toPromise();
  }
  // water seed > 31 days
  async waterSeed(packageRef) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http
      .post<UserPlantedModel>(
        `${environment.serverUrl}/api/orders/${packageRef}/watering`,
        {},
        httpOptions
      )
      .toPromise();
  }

  async havestBaskets(packageRef) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http
      .post<UserPlantedModel>(
        `${environment.serverUrl}/api/harvest/${packageRef}/basket`,
        {},
        httpOptions
      )
      .toPromise();
  }

  // deposit UDST wallet
  async depositUSDT(amount: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.authService.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };

    return this.http
      .post<PaymentModel>(
        `${environment.serverUrl}/api/usdt/deposit`,
        { amount: amount },
        httpOptions
      )
      .toPromise();
  }

  async germinateAll() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http
      .post<UserPlantedModel>(
        `${environment.serverUrl}/api/orders/germinate-all`,
        {},
        httpOptions
      )
      .toPromise();
  }
  //water all
  async waterAll() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http
      .post<UserPlantedModel>(
        `${environment.serverUrl}/api/orders/watering-all`,
        {},
        httpOptions
      )
      .toPromise();
  }
  // USDT Wallet Txn
  async USDTTxnList(
    sortDesc?: boolean,
    sortBy?: string,
    page?: number,
    type?: number,
    start_date?: string,
    end_date?: string
  ) {
    var sortDesc = sortDesc ?? true;
    var sortBy = sortBy ?? 'datetime';
    var page = page ?? 1;
    var type = type ?? 1;
    var dateRange =
      start_date && end_date
        ? `&start_date=${start_date}&end_date=${end_date}`
        : '';
    let queryParams = `itemsPerPage=20&sortDesc=${sortDesc}&sortBy=${sortBy}&page=${page}&type=${type}${dateRange}`;

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.authService.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };

    return this.http
      .get(
        `${environment.serverUrl}/api/transactions/usdt?${queryParams}`,
        httpOptions
      )
      .toPromise();
  }

  getUserLang() {
    return !!window.localStorage.getItem('ef2_lang')
      ? window.localStorage.getItem('ef2_lang')
      : 'en';
  }

  //transfer seed otp
  async sendOTP(
    recipient_username: string,
    amount: number
  ): Promise<Observable<UserModel>> {
    const postRequest = {
      recipient_username: recipient_username,
      amount: amount,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };

    return this.http.post<UserModel>(
      `${environment.serverUrl}/api/seeds/transfer/request-otp`,
      postRequest,
      httpOptions
    );
  }
  // transfer seed
  async transferSeed(
    amount: number,
    recipient_username: string,
    otp_code: number
  ): Promise<Observable<TransferSeedDataModel>> {
    const postRequest = {
      amount: amount,
      recipient_username: recipient_username,
      otp_code: otp_code,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };

    return this.http.post<TransferSeedDataModel>(
      `${environment.serverUrl}/api/seeds/transfer/proceed`,
      postRequest,
      httpOptions
    );
  }

  async fertiliseSeed(packageRef) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http
      .post<UserPlantedModel>(
        `${environment.serverUrl}/api/orders/${packageRef}/fertilize`,
        {},
        httpOptions
      )
      .toPromise();
  }
}
