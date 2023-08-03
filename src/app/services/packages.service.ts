import {
  OrderModel,
  PackageModel,
  PaymentModel,
  PaymentReplantModel,
} from './../models/packages.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  // seed packages list
  async getSeedPackages() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.authService.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };

    return this.http
      .get<PackageModel>(`${environment.serverUrl}/api/packages`, httpOptions)
      .toPromise();
  }

  // purchase seed package
  async purchasePackage(id: number, quantity: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.authService.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };

    return this.http
      .post<PaymentModel>(
        `${environment.serverUrl}/api/order/payment`,
        { package_id: id, quantity: quantity },
        httpOptions
      )
      .toPromise();
  }

  // Using USDT Ballance Wallet to Purchase
  async purchaseusdtWallet(id: number, quantity: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.authService.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };

    return this.http
      .post<PaymentReplantModel>(
        `${environment.serverUrl}/api/order/seed-payment-usdt`,
        { package_id: id, quantity: quantity },
        httpOptions
      )
      .toPromise();
  }

  // Get Replant Value Calculation
  async replantCalculation(id: number, quantity: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.authService.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };

    return this.http
      .get<PaymentReplantModel>(
        `${environment.serverUrl}/api/order/seed-payment/calculation?package_id=${id}&quantity=${quantity}`,
        httpOptions
      )
      .toPromise();
  }

  // replant seed package
  async replantsPackage(id: number, quantity: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.authService.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };

    return this.http
      .post<PaymentModel>(
        `${environment.serverUrl}/api/order/seed-payment`,
        { package_id: id, quantity: quantity },
        httpOptions
      )
      .toPromise();
  }

  // seed packages order list
  async getOrdersList() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.authService.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };

    return this.http
      .get<OrderModel>(`${environment.serverUrl}/api/orders`, httpOptions)
      .pipe(
        map((ev) => ({
          success: ev.success,
          total_earth_tree: ev.total_earth_tree,
          total_love_tree: ev.total_love_tree,
          data: ev.data.map((e) => {
            e['color'] = this.getPackageColor(e['package_name']);
            e['ordered_at_timestamp'] =
              Number(e['ordered_at_timestamp']) * 1000;
            return e;
          }),
        }))
      )
      .toPromise();
  }

  async getTreesURL(package_ref) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.authService.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };

    return this.http
      .get(`${environment.serverUrl}/api/tree-urls/${package_ref}`, httpOptions)
      .toPromise();
  }

  getPackageColor(packageName) {
    switch (packageName) {
      case 'T100':
        return '#d6d286';
      case 'T500':
        return '#738700';
      case 'T1K':
        return '#38720c';
      case 'T5K':
        return '#366006';
      case 'T10K':
        return '#16402a';
    }
  }

  getUserLang() {
    return !!window.localStorage.getItem('ef2_lang')
      ? window.localStorage.getItem('ef2_lang')
      : 'en';
  }
}
