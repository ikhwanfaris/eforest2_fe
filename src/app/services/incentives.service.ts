import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IncentivesModel } from '../models/incentives.model';

@Injectable({
  providedIn: 'root',
})
export class IncentivesService {
  constructor(private http: HttpClient) {}

  getSeptIncentives() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http
      .get<IncentivesModel>(
        `${environment.serverUrl}/api/topSeptL1`,
        httpOptions
      )
      .toPromise();
  }

  getTopSeptBuddy() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http
      .get<IncentivesModel>(
        `${environment.serverUrl}/api/TopSeptBuddy`,
        httpOptions
      )
      .toPromise();
  }

  getBuddy10k(page) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http
      .get<IncentivesModel>(
        `${environment.serverUrl}/api/Buddy10k/${page}`,
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
