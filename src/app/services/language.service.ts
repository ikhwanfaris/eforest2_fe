import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MessagePusher, VisitorToken } from '../models/home.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
langObserve = new BehaviorSubject(null);
  constructor(private http: HttpClient) {}
 
  async LanguagePusher(lang) {
    this.langObserve.next(lang);
  }


}
