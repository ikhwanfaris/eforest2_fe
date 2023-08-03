import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { P2PListModel } from '../models/p2p.model';
import { UserPlantedModel } from '../models/seeds.model';
import { UserModel } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class P2pService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  async p2pRequestOTP(ad_type, amount) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.authService.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };

    const postRequest = {
      amount: amount,
    };

    return this.http
      .post<UserModel>(
        `${environment.serverUrl}/api/trade/${ad_type}/request-otp`,
        postRequest,
        httpOptions
      )
      .toPromise();
  }

  async p2pTradeStart(ad_type, amount, otp) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.authService.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };

    const postRequest = {
      amount: amount,
      otp_code: otp,
    };

    return this.http
      .post<UserPlantedModel>(
        `${environment.serverUrl}/api/trade/${ad_type}`,
        postRequest,
        httpOptions
      )
      .toPromise();
  }

  async p2pTradeList(
    ad_type,
    itemsPerPage,
    page,
    sortBy,
    sortDesc,
    createdStartDate,
    createdEndDate
  ) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.authService.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };

    const postRequest = `?type=${ad_type}&itemsPerPage=${itemsPerPage}&page=${page}
    &sortBy=${sortBy}&sortDesc=${sortDesc}&created_start_date=${createdStartDate}
    &created_end_date=${createdEndDate}`;

    return this.http
      .get<P2PListModel>(
        `${environment.serverUrl}/api/trade${postRequest}`,
        httpOptions
      )
      .toPromise();
  }

  async cancelTrade(ad_id) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.authService.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };

    return this.http
      .post<UserPlantedModel>(
        `${environment.serverUrl}/api/trade/${ad_id}/cancel`,
        {},
        httpOptions
      )
      .toPromise();
  }

  getUserLang() {
    return !!window.localStorage.getItem('ef2_lang')
      ? window.localStorage.getItem('ef2_lang')
      : 'en';
  }
}
