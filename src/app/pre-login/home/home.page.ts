import { Component, OnInit, Injector } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import SwiperCore, { SwiperOptions, Navigation, Pagination } from 'swiper';
import { TranslateService } from '@ngx-translate/core';
import { TotalCountModel } from 'src/app/models/home.model';
import { HomeService } from 'src/app/services/home.service';
import { environment } from 'src/environments/environment';
import numberRollup from 'number-rollup';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { LanguageService } from 'src/app/services/language.service';

// import { environment } from 'src/environments/environment';
// import Echo from 'laravel-echo';
// import Pusher from 'pusher-js';

// import { Flip } from 'number-flip';
// import ScrollReveal from 'scrollreveal';

SwiperCore.use([Navigation, Pagination]);
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends BasePage implements OnInit {
  //showLovetree = false;
  window = window;
  user_is;
  user_are;
  currently_view;
  showEarthtree = false;
  TotalCount;
  totalTree;
  //window = window;
  // showLovetree: boolean;
  // showEarthtree: boolean;

  swiperConfig: SwiperOptions = {
    grabCursor: !0,
    watchSlidesProgress: !0,
    loop: !0,
    loopedSlides: 5,
    slidesPerView: 'auto',
    centeredSlides: true,
    navigation: !0,
    pagination: !0,
    autoplay: {
      delay: 3000,
    },
    on: {
      progress(e: any) {
        const t = e.slides.length;
        for (let r = 0; r < e.slides.length; r += 1) {
          const o: any = e.slides[r],
            s = e.slides[r].progress,
            i = Math.abs(s);
          let n = 1;
          i > 1 && (n = 0.3 * (i - 1) + 1);
          const l = o.querySelectorAll('.carousel-slider-animate-opacity'),
            a = s * n * 50 + '%',
            c = 1 - 0.2 * i,
            d = t - Math.abs(Math.round(s));
          (o.style.transform = `translateX(${a}) scale(${c})`),
            (o.style.zIndex = d),
            (o.style.opacity = i > 3 ? 0 : 1),
            l.forEach((e) => {
              e.style.opacity = 1 - i / 3;
            });
        }
      },

      setTransition(e, t) {
        for (let r = 0; r < e.slides.length; r += 1) {
          const o: any = e.slides[r],
            s = o.querySelectorAll('.carousel-slider-animate-opacity');
          (o.style.transitionDuration = `${t}ms`),
            s.forEach((e) => {
              e.style.transitionDuration = `${t}ms`;
            });
        }
      },
    },
  };
  descText = '';
  constructor(
    injector: Injector,
    public langServe: LanguageService,
    public translate: TranslateService,
    private homeService: HomeService
  ) {
    super(injector);
  }

  async ngOnInit() {
    //window.localStorage.getItem('ef2_lang');
    //let defaultLang = window.localStorage.getItem("ef2_lang");
    //console.log(defaultLang);
    // console.log(window.localStorage.getItem('ef2_lang'));
    this.window['Pusher'] = Pusher;
    //const copyMessage = await this.getTrans('SUCCESSFULLY_COPIED');
    this.langServe.langObserve.subscribe(async (langUpdate) => {
      //console.log(abc);
      this.user_is = await this.getTrans('USERS_IS');
      this.user_are = await this.getTrans('USERS_ARE');
      this.currently_view = await this.getTrans('CURRENTLY_VIEW');
    });

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
          register: '',
          buy_package: '',
        },
      },
    ];
    //console.log('ALVIN')

    const translate = (language, key, args = []) => {
      //console.log(translate + '1111');

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

    const echoPresence = environment.pusher_visitor;
    const echoVisitor = new Echo({
      ...echoPresence,
      authorizer: (channel, options) => ({
        authorize: async (socketId, callback) => {
          const result = await await this.homeService.pusherVisitorCounter(
            socketId,
            channel,
            callback
          );
        },
      }),
    });
    const result = await (
      await this.homeService.pusherVisitorToken()
    )
      .toPromise()
      .then((response) => {
        //console.log(response);
        var token = response.token;
        localStorage.setItem('visitor_token', token); // store in local storage

        let numUsers = 1;
        //console.log(EchoPresence)
        echoVisitor
          .join('visitor-counter')
          .here((users) => {
            //console.log(users);
            numUsers = users.length;

            // toast or noti here. message same as console above
          })
          .joining((user) => {
            //console.log(`User ${user.id} joined the visitors-counter channel`);
            //console.log(user);
            numUsers++;

            //console.log(`${numUsers} ${numUsers === 1 ? this.getTrans('USER_IS') : 'users are'} currently viewing our website`);
            const numUser =
              `${numUsers} ${numUsers === 1 ? this.user_is : this.user_are}` +
              '' +
              this.currently_view;
            //console.log(numUser);
            this.showToast(numUser, 3000, 'top', 'light');
          })
          .leaving((user) => {
            numUsers--;
            numUsers = numUsers <= 0 ? 1 : numUsers;
            //console.log(`User ${user.id} left the visitors-counter channel`);
            //console.log(user);

            // no need toast or noti here i assume
          });
      })
      .catch(function (error) {
        // Handle error
      });
    // numberRollup();
    this.descText = await this.getTrans('BUY_SEED_PACKAGE');
    // To display data out straight away.
    const hometotalCount: any = await this.homeService.totalCountTree();
    if (hometotalCount.success) {
      this.TotalCount = Number(hometotalCount.data);
    }
    await this.homeService.totalCountTree();
    //this.totalTree = Math.round(this.data.love);
    this.totalTree = Math.round(
      Number(hometotalCount.data.total_earth_tree_count) +
        Number(hometotalCount.data.total_love_tree_count)
    );
    //alert(Number(hometotalCount.data.total_earth_tree_count))
    if (hometotalCount) {
      numberRollup({
        id: 'totalEarthTrees',
        startNumber: 0,
        endNumber: Number(hometotalCount.data.total_earth_tree_count),
        duration: 8000, // ms
        formatNumber: (s) => this.numberWithCommas(s), // optional
        easing: 'easeIn', // optional
      });
      numberRollup({
        id: 'totalLoveTrees',
        startNumber: 0,
        endNumber: Number(hometotalCount.data.total_love_tree_count),
        duration: 8000, // ms
        formatNumber: (s) => this.numberWithCommas(s), // optional
        easing: 'easeIn', // optional
      });
      numberRollup({
        id: 'totalTrees',
        startNumber: 0,
        endNumber: Number(this.totalTree),
        duration: 3000, // ms
        formatNumber: (s) => this.numberWithCommas(s), // optional
        easing: 'easeIn', // optional
      });
    }
    // ScrollReveal().reveal('.total_count');
    // ScrollReveal().reveal('.tree_plated_container')
    // console.log(document.querySelector('.flip'));
    // },1000)
    // this.showLovetree == true;
    // this.showEarthtree == false;
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  async clickTree() {
    // this.showLovetree == false;
    this.showEarthtree = false;
  }

  async clickEarthTree() {
    // this.showLovetree == false;
    this.showEarthtree = true;
    // console.log('abc');
  }

  onSwiper(swiper) {
    // console.log(swiper);
  }
  async onSlideChange(ev) {
    console.log('changed');
    const index = ev[0].realIndex;
    switch (index) {
      case 0:
        //this.descText = '1. Buy a seed package';
        this.descText = 'BUY_SEED_PACKAGE';
        break;
      case 1:
        this.descText = 'PLANT_SEEDS_ON';
        break;
      case 2:
        this.descText = 'WATER_SEEDS_30_DAYS';
        break;
      case 3:
        this.descText = 'WATER_DAILY_EARNING';
        break;
      case 4:
        this.descText = 'FRUIT_EARNING_PASSIVE';
        break;
      default:
        this.descText = 'BUY_SEED_PACKAGE';
        break;
    }
    document.getElementsByClassName('carousel_desc')[0].innerHTML =
      await this.getTrans(this.descText);
    // this.descText;

    // console.log('slide change', ev);
  }

  getRoadMapLang() {
    const lang = !!window.localStorage.getItem('ef2_lang')
      ? window.localStorage.getItem('ef2_lang')
      : 'en';

    switch (lang) {
      case 'en':
        return '../../../assets/images/roadmap/road-map-transparent.png';
      case 'zh_CN':
        return '../../../assets/images/roadmap/road-map-CHS.png';
      case 'vi':
        return '../../../assets/images/roadmap/road-map-VIET.png';
      case 'ms':
        return '../../../assets/images/roadmap/road-map-BM.png';
      case 'ja':
        return '../../../assets/images/roadmap/road-map-JPN.png';
      case 'id':
        return '../../../assets/images/roadmap/road-map-IND.png';
      case 'pt':
        return '../../../assets/images/roadmap/road-map-POR.png';
      case 'zh_TW':
        return '../../../assets/images/roadmap/road-map-CHT.png';
      default:
        return '../../../assets/images/roadmap/road-map-transparent.png';
    }
  }

  getGrowTreeTitleLang() {
    const lang = !!window.localStorage.getItem('ef2_lang')
      ? window.localStorage.getItem('ef2_lang')
      : 'en';

    switch (lang) {
      case 'en':
        return '../../../assets/images/img-we-grow-trees-to-save-our-earth.png';
      case 'zh_CN':
        return '../../../assets/images/We-grow-trees-to-save-our-earth-CHS.png';
      case 'vi':
        return '../../../assets/images/We-grow-trees-to-save-our-earth-VIET.png';
      case 'ms':
        return '../../../assets/images/We-grow-trees-to-save-our-earth-BM.png';
      case 'ja':
        return '../../../assets/images/Start-Your-Journey-with-eFOREST-JPN.png';
      case 'id':
        return '../../../assets/images/Start-Your-Journey-with-eFOREST-languages-IDN.png';
      case 'pt':
        return '../../../assets/images/Start-Your-Journey-with-eFOREST-languages-POR.png';
      default:
        return '../../../assets/images/img-we-grow-trees-to-save-our-earth.png';
    }
  }
}
