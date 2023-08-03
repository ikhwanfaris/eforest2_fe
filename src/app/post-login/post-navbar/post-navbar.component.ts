import { HomeService } from './../../services/home.service';
import { BasePage } from 'src/app/base-page/base-page';
import { AuthService } from './../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, HostListener, OnInit, Injector } from '@angular/core';
import { MenuController } from '@ionic/angular';
import sideMenu from '../../static/sidemenu.json';
import {
  UserDetailModel,
  UserUsdtBalanceModel,
} from '../../../app/models/user.model';
import { LanguagesComponent } from '../../languages/languages.component';
import { AnnouncementComponent } from 'src/app/announcement/announcement.component';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { SideMenuItems } from 'src/app/enums/enums';
@Component({
  selector: 'app-post-navbar',
  templateUrl: './post-navbar.component.html',
  styleUrls: ['./post-navbar.component.scss'],
})
export class PostNavbarComponent extends BasePage implements OnInit {
  activeAnchor = '';
  nav_bar: HTMLCollection;
  initials = '';
  mobile = false;
  SideMenu = sideMenu;
  selectedMenu = 0;
  userDetails: UserDetailModel;
  usdtBalance = '0';
  seedBalance = '0';
  SideMenuItems = SideMenuItems;
  totalEarthTree = 0;
  totalLoveTree = 0;
  typeSelected = 'buy';
  constructor(
    private actRoute: ActivatedRoute,
    public router: Router,
    private menu: MenuController,
    private authService: AuthService,
    injector: Injector,
    private sanitizer: DomSanitizer,
    private homeService: HomeService
  ) {
    super(injector);
  }

  async ngOnInit() {
    const route = window.location.pathname;
    const actRoute = this.actRoute.snapshot.routeConfig.path;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.routeAuthenticate();
    //await this.authService.userDetails();
    this.userDetails = JSON.parse(this.authService.getUserDetails());
    // this.userDetails.country_id = 45;
    await this.authService.usdtBalance();
    await this.authService.geUSDTBalance().subscribe((val) => {
      this.usdtBalance = val.usdt_balance;
    });
    await this.authService.getSeedBalance().subscribe((val) => {
      this.seedBalance = val.seed_balance;
    });
    // console.log(this.userDetails);
    const routeLength = route.split('/').length;
    if (routeLength > 2) {
      this.activeAnchor = route.split('/')[routeLength - 1] || actRoute;
    } else {
      this.activeAnchor = route.split('/')[1] || actRoute;
    }
    this.nav_bar = document.getElementsByClassName('navigation_inner');
    //  const userDetails: UserDetailModel = JSON.parse(this.authService.getUserDetails());
    //   this.initials = userDetails.fullname.split(' ')[0][0];
    //   console.log(this.initials);
    try {
      const hometotalCount: any = await this.homeService.totalCountTree();
      this.totalEarthTree = this.numberWithCommas(
        hometotalCount.data.total_earth_tree_count
      );
      this.totalLoveTree = this.numberWithCommas(
        hometotalCount.data.total_love_tree_count
      );
    } catch (e) {
      console.log(e);
    }
    if (window.innerWidth <= 768) {
      // 768px portrait
      this.mobile = true;
    }
  }

  scrollEvent(event) {
    for (var i = 0; i < this.nav_bar.length; i++) {
      if (event.detail.scrollTop > 0) {
        // apply position: fixed if you
        this.nav_bar[i].classList.add('fixed');
      } else {
        this.nav_bar[i].classList.remove('fixed'); // apply position: static
      }
    }
  }

  async changeRoute(route, message?: string) {
    if (route == '/login') {
      try {
        const logout = await (await this.authService.userLogout()).toPromise();
        this.authService.removeUserDetails();
        this.authService.removeUserToken();
        this.showToast(message ? message : 'Successfully logged out');
        this.router.navigateByUrl(`${route}`, { replaceUrl: true });
      } catch (e) {
        this.showToast(e.error.message, 3000, 'top', 'error');
        console.error(e);
        this.dismissLoadingView();
        this.router.navigateByUrl(`${route}`, { replaceUrl: true });
      }
    } else {
      this.router.navigateByUrl(`${route}`, { replaceUrl: true });
    }
  }

  openMenu() {
    this.menu.enable(true, 'post_menu');
    this.menu.open('post_menu');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth <= 768) {
      // 768px portrait
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  changePage(page: number) {
    // console.log(page);
    // console.log(page);
    this.routeAuthenticate();
    const allRoutes = document.getElementsByClassName('side_menu_button');
    // console.log(page);
    for (let i = 0; i < allRoutes.length; i++) {
      allRoutes[i].classList.remove('side_menu_button_active');
    }
    this.selectedMenu = page;
    // allRoutes[page - 1].classList.add('side_menu_button_active');
    /** for mobile sidemenu */
    // allRoutes[page - 1 + (allRoutes.length / 2)].classList.add(
    //   'side_menu_button_active'
    // );

    if (this.menu.isOpen('post_menu')) {
      this.menu.close('post_menu');
    }
  }

  routeToP2POrderHistory(type) {
    this.typeSelected = type;
    this.changePage(SideMenuItems.ORDER_HISTORY);
  }

  showAccordion(groupId) {
    const group: any = Array.from(this.SideMenu).filter(
      (menu: any) => menu.groupId === groupId
    )[0];
    group.isOpen = !group.isOpen;
  }

  openAccordion(groupId) {
    const group: any = Array.from(this.SideMenu).filter(
      (menu: any) => menu.groupId === groupId
    )[0];
    group.isOpen = 1;
  }

  async routeAuthenticate() {
    try {
      await this.authService.userDetails();
      const result = await this.authService.getUserDetails();
    } catch (e) {
      console.log(e);
      this.changeRoute('/login', e.error.message);
    }
  }

  async changeLanguage() {
    const modal = await this.modalCtrl.create({
      component: LanguagesComponent,
    });
    modal.onDidDismiss().then(() => {});
    return await modal.present();
  }

  async showAnnouncement() {
    const defaultLang = !!localStorage.getItem('ef2_lang')
      ? localStorage.getItem('ef2_lang')
      : 'en';
    const modal = await this.modalCtrl.create({
      component: AnnouncementComponent,
      componentProps: {
        modalTitle: await this.getTrans('ANNOUNCEMENT'),
        modalUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
          environment.announcementUrl +
            `?lang=${defaultLang}#googtrans(defaultLang)` +
            `&country_id=${this.userDetails.country_id}`
        ),
      },
      cssClass: 'announcementModal',
    });
    modal.onDidDismiss().then(() => {});
    return await modal.present();
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
