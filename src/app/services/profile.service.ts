import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BeneficiaryModel } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  async userDownlines() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http
      .get(`${environment.serverUrl}/api/user/downlines?level=one`, httpOptions)
      .toPromise();
  }

  async getBeneficiaryInfo() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http
      .get(`${environment.serverUrl}/api/user-beneficiary`, httpOptions)
      .toPromise();
  }

  async updateBeneficiaryInfo(
    beneficiaryFields
  ): Promise<Observable<BeneficiaryModel>> {
    const postRequest = {
      bef_name: beneficiaryFields.bef_name,
      bef_email: beneficiaryFields.bef_email,
      bef_mobile: beneficiaryFields.bef_mobile,
      bef_id_no: beneficiaryFields.bef_id_no,
    };

    // console.log(postRequest);
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http.post<BeneficiaryModel>(
      `${environment.serverUrl}/api/user-beneficiary/update`,
      postRequest,
      httpOptions
    );
  }

  async setEarningLimit(
    limit
  ): Promise<Observable<BeneficiaryModel>> {
    const postRequest = {
      alert_pct: limit
    };

    // console.log(postRequest);
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http.post<BeneficiaryModel>(
      `${environment.serverUrl}/api/user/update`,
      postRequest,
      httpOptions
    );
  }

  getUserToken() {
    return window.localStorage.getItem('ef2_token');
  }
  getUserDownLine() {
    return window.localStorage.getItem('eforest_user_downline');
  }

  async userDownlinesTwo() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http
      .get(
        `${environment.serverUrl}/api/user/downlines?level=lte_two`,
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
