import { LanguagesComponent } from './../../languages/languages.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import languages from '../../static/languages.json';

@Component({
  selector: 'app-pre-navbar',
  templateUrl: './pre-navbar.component.html',
  styleUrls: ['./pre-navbar.component.scss'],
})
export class PreNavbarComponent implements OnInit {
  activeAnchor = '';
  nav_bar: HTMLCollection;
  lang_button: HTMLCollection;
  mobile = false;
  languageList = languages;

  constructor(
    private actRoute: ActivatedRoute,
    public router: Router,
    private menu: MenuController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    const route = window.location.pathname;
    const actRoute = this.actRoute.snapshot.routeConfig.path;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.activeAnchor = route.split('/')[1] || actRoute;
    this.nav_bar = document.getElementsByClassName('navigation_inner');
    this.lang_button = document.getElementsByClassName('language_selection');

    if (window.innerWidth <= 576) {
      // 768px portrait
      this.mobile = true;
    }
  }

  scrollEvent(event) {
    for (var i = 0; i < this.nav_bar.length; i++) {
      if (event.detail.scrollTop > 0) {
        // apply position: fixed if you
        this.nav_bar[i].classList.add('fixed');
        this.lang_button[i].classList.add('language_selection2');
      } else {
        this.nav_bar[i].classList.remove('fixed'); // apply position: static
        this.lang_button[i].classList.remove('language_selection2');
      }
    }
  }

  changeRoute(route) {
    this.router.navigateByUrl(`${route}`, { replaceUrl: true });
  }

  openMenu() {
    this.menu.enable(true, 'menu');
    this.menu.open('menu');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth <= 576) {
      // 768px portrait
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  async changeLanguage() {
    const modal = await this.modalCtrl.create({
      component: LanguagesComponent,
    });
    modal.onDidDismiss().then(() => {});
    return await modal.present();
  }

  getCurrentLang() {
    // console.log(!!window.localStorage.getItem('ef2_lang'));
    const lang = !!window.localStorage.getItem('ef2_lang')
      ? window.localStorage.getItem('ef2_lang')
      : 'en';
    const result: any = Array.from(this.languageList).filter(
      (val: any) => val.lang == lang
    );
    return result[0].name;
  }
}
