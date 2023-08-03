import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { BasePage } from 'src/app/base-page/base-page';
import { Component, Injector, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { HomeService } from 'src/app/services/home.service';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LanguageService } from './services/language.service';
import { HomeAnnouncementComponent } from './home-announcement/home-announcement.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent extends BasePage implements OnInit {
  window = window;
  data: any;
  langObserve = new BehaviorSubject(null);
  constructor(
    injector: Injector,
    public langServe: LanguageService,
    private authService: AuthService,
    private router: Router,
    public translate: TranslateService,
    private homeService: HomeService
  ) {
    super(injector);
  }

  async ngOnInit() {
    // if (this.authService.getUserToken() && this.authService.getUserDetails()) {
    //   this.router.navigate(['/home']);
    // } else {
    //   this.router.navigate(['/']);
    // }
    //this.routeAuthenticate();
    this.showAnnouncement();
    this.window['Pusher'] = Pusher;
    const echoConfig = environment.pusher;
    const EchoObj = new Echo(echoConfig);
    console.log(new Echo(echoConfig));
    console.log(EchoObj);

    //console.log(EchoObj)

    const translations = [
      {
        language: 'en',
        items: {
          register:
            ':1 has created an account to start eForest journey with us!',
          buy_package: ':1 has planted :2 tree(s) to save our earth!',
        },
      },
      {
        language: 'vi',
        items: {
          register:
            ':1 đã tạo tài khoản để bắt đầu hành trình eForest cùng chúng ta!',
          buy_package: ':1 đã trồng :2 cây để cứu trái đất của chúng ta!',
        },
      },
      {
        language: 'zh_CN',
        items: {
          register: ':1已经创建了一个账户,与我们一起开始e森林之旅!',
          buy_package: ':1已经种植了:2棵树来拯救我们的地球!',
        },
      },
      {
        language: 'zh_TW',
        items: {
          register: ':1已經創建了一個賬戶,與我們一起開始e森林之旅!',
          buy_package: ':1已經種植了:2棵樹來拯救我們的地球!!',
        },
      },
    ];
    //  console.log(translations);
    //  console.log('Testing');

    const translate = (language, key, args = []) => {
      //console.log(translate);

      const translation = translations.find((t) => t.language === language);
      const englishTranslation = translations.find(
        (t) => t.language === 'en'
      ).items;
      let result = '';
      if (translation && translation.items[key]) {
        result = translation.items[key];
      } else if (englishTranslation[key]) {
        result = englishTranslation[key];
      }
      for (let i = 0; i < args.length; i++) {
        result = result.replace(`:${i + 1}`, args[i]);
      }
      return result;
    };

    EchoObj.channel('landing-message')
      .listen('.landing-message-event', async (e) => {
        var translation_words = translate(
          window.localStorage.getItem('ef2_lang'),
          e.key,
          e.items
        );
        console.log(e);
        // const result = await (
        //   await this.homeService.pusherMessage('')
        // ).toPromise();
        // if(result['success'] == true){
        //   console.log(result);
        //   //this.showToast(result['message'], 3000, 'top', 'error');
        // }
        this.showToast(translation_words, 3000, 'top', 'light');
      })
      .error((error) => {
        console.error(error);
      });
    //DemoMessage(EchoObj);
    this.setupLanguage();
  }

  async setupLanguage() {
    const defaultLang = !!localStorage.getItem('ef2_lang')
      ? localStorage.getItem('ef2_lang')
      : 'en';
    console.log(defaultLang);
    this.translate.setDefaultLang(defaultLang);
    try {
      // const lang = await environment.defaultLang;
      //this.localStorage.setLang(lang);
      this.translate.use(defaultLang);
      this.langServe.LanguagePusher(defaultLang);
      //this.preference.lang = lang;
    } catch (error) {
      console.warn(error);
    }
  }

  async showAnnouncement() {
    const defaultLang = !!localStorage.getItem('ef2_lang')
      ? localStorage.getItem('ef2_lang')
      : 'en';

    const modal = await this.modalCtrl.create({
      component: HomeAnnouncementComponent,
      componentProps: {
        modalTitle: await this.getTrans('HOME_ANNOUNCEMENT'),
        // modalUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
        //   environment.videoUrl
        // ),
      },
      cssClass: 'videoModal',
    });
    modal.onDidDismiss().then(() => {});
    return await modal.present();
  }

  // async routeAuthenticate() {
  //   try {
  //     await this.authService.userDetails();
  //     const result = await this.authService.getUserDetails();
  //   } catch (e) {
  //     console.log(e);
  //     this.changeRoute('/login', e.error.message);
  //   }
  // }
  

  // async changeRoute(route, message?: string) {
  //   if (route == '/login') {
  //     try {
  //       const logout = await (await this.authService.userLogout()).toPromise();
  //       this.authService.removeUserDetails();
  //       this.authService.removeUserToken();
  //       this.showToast(message ? message : 'Successfully logged out');
  //       this.router.navigateByUrl(`${route}`, { replaceUrl: true });
  //     } catch (e) {
  //       this.showToast(e.error.message, 3000, 'top', 'error');
  //       console.error(e);
  //       this.dismissLoadingView();
  //       this.router.navigateByUrl(`${route}`, { replaceUrl: true });
  //     }
  //   } else {
  //     this.router.navigateByUrl(`${route}`, { replaceUrl: true });
  //   }
  // }
}
