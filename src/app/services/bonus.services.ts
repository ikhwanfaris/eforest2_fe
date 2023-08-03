import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BonusModel } from '../models/bonus.model';

@Injectable({
  providedIn: 'root',
})
export class BonusService {
  constructor(private http: HttpClient) {}

  async userDirectBonus(page: number, start_date: string, end_date: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http
      .get(
        `${environment.serverUrl}/api/bonus/direct-referral?itemsPerPage=20&sortDesc=false&page=` +
          page +
          '&start_date=' +
          start_date +
          '&end_date=' +
          end_date,
        httpOptions
      )
      .toPromise();
  }

  async userEarning(page: number, sortBy?: string, sortDesc?: boolean) {
    console.log(page);
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };

    var sortDesc = sortDesc ?? true;
    var sortBy = sortBy ?? 'datetime';
    var page = page ?? 1;
    let queryParams = `itemsPerPage=20&sortDesc=${sortDesc}&sortBy=${sortBy}&page=${page}`;
    return this.http
      .get(
        `${environment.serverUrl}/api/earning/multiverse/bonus?${queryParams}`,
        httpOptions
      )
      .toPromise();
  }

  async getTotalCommAmt(username: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    const postRequest = {
      username: username,
    };

    return this.http
      .get(
        `${environment.serverUrl}/api/user/my-total-community-amount?username=` +
          username,
        httpOptions
      )
      .toPromise();
  }

  async getTotalSalesAmt(username: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    const postRequest = {
      username: username,
    };

    return this.http
      .get(
        `${environment.serverUrl}/api/user/my-total-team-sales?username=` +
          username,
        httpOptions
      )
      .toPromise();
  }

  getUserToken() {
    return window.localStorage.getItem('ef2_token');
  }
  getUserDownLine() {
    return window.localStorage.getItem('eforest_user_downline');
  }

  async userTeamBonus(page: number, start_date: string, end_date: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http
      .get(
        `${environment.serverUrl}/api/bonus/team?itemsPerPage=20&sortDesc=false&page=` +
          page +
          '&start_date=' +
          start_date +
          '&end_date=' +
          end_date,
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
