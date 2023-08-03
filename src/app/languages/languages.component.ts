import { ModalController } from '@ionic/angular';
import { Component, Injector, OnInit } from '@angular/core';
import languages from '../static/languages.json';
import { BasePage } from '../base-page/base-page';
import { BehaviorSubject } from 'rxjs';
import { LanguageService } from '../services/language.service';
//import { LanguageService } from 'src/app/services/languages.service.ts';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent extends BasePage implements OnInit {
  languageList = languages;
  langObserve = new BehaviorSubject(null);
  modal: HTMLElement;
  constructor(injector: Injector, public langServe: LanguageService) {
    super(injector);
  }

  ngOnInit() {
    this.languageList.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
  }

  onDismiss() {
    this.modalCtrl.dismiss();
  }

  async changeLang(lang) {
    try {
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);
      window.localStorage.setItem('ef2_lang', lang);
      console.log(window.localStorage.getItem('ef2_lang'));
      this.showToast(
        await this.getTrans('LANG_UPDATE_SUCCESS'),
        3000,
        'top',
        'success'
      );
      //this.langObserve.next(lang);
      this.langServe.LanguagePusher(lang);
      this.onDismiss();
    } catch (e) {
      this.showToast(
        await this.getTrans('LANG_UPDATE_FAIL'),
        3000,
        'top',
        'error'
      );
      this.onDismiss();
    }
  }
}
