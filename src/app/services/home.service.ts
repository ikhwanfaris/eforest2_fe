import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MessagePusher, VisitorToken } from '../models/home.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  async totalCountTree() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http
      .get(`${environment.serverUrl}/api/data/total-tree-count`, httpOptions)
      .toPromise();
  }

  // Pusher Message For Package & Register
  async pusherMessage(message: string) {
    const postRequest = {
      message: message,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'X-Locale': this.getUserLang(),
      }),
    };

    return this.http.post<MessagePusher>(
      `${environment.serverUrl}/api/pusher/demo`,
      postRequest,
      httpOptions
    );
  }

  // Pusher for Visitor Count
  async pusherVisitorToken() {
    const postRequest = {};

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'X-Locale': this.getUserLang(),
      }),
    };

    return this.http.post<VisitorToken>(
      `${environment.serverUrl}/api/visitor/create/token`,
      postRequest,
      httpOptions
    );
  }

  async pusherVisitorCounter(socketId, channel, callback) {
    const data = {
      socket_id: socketId,
      channel_name: channel.name,
    };

    const config = {
      headers: {
        Accept: 'application/json',
        'X-Locale': this.getUserLang(),
        Authorization: `Bearer ${localStorage.getItem('visitor_token')}`,
      },
    };

    return this.http
      .post(`${environment.serverUrl}/api/broadcasting/auth`, data, config)
      .toPromise()
      .then((response) => {
        //console.log(response)
        callback(false, response);
      })
      .catch((error) => {
        callback(true, error);
      });
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
