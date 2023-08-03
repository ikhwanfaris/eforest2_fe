import { Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  LoadingController,
  ToastController,
  ModalController,
} from '@ionic/angular';
export abstract class BasePage {
  protected loadingCtrl: LoadingController;
  protected toastCtrl: ToastController;
  protected modalCtrl: ModalController;
  protected translate: TranslateService;

  constructor(injector: Injector) {
    this.loadingCtrl = injector.get(LoadingController);
    this.toastCtrl = injector.get(ToastController);
    this.modalCtrl = injector.get(ModalController);
    this.translate = injector.get(TranslateService);
  }
  private loader = null;

  async showLoadingView() {
    const str = await this.getTrans('LOADING');

    this.loader = await this.loadingCtrl.create({
      message: str,
    });

    return await this.loader.present();
  }

  async dismissLoadingView() {
    if (!this.loader) {
      if (this.loadingCtrl) {
        return await this.loadingCtrl.dismiss();
      } else {
        return;
      }
    }

    try {
      return await this.loader.dismiss();
    } catch (error) {
      console.log('ERROR: LoadingController dismiss', error);
    }
  }

  getTrans(key: string | string[]) {
    return this.translate.get(key).toPromise();
  }

  async showToast(
    message: string,
    duration?: number,
    position?: 'top' | 'bottom',
    status?: 'success' | 'error' | 'warning' | 'light'
  ) {
    const toastDuration = duration ? duration : 3000;
    const toastPosition = position ? position : 'top';
    let toastClass = 'toast_success';
    let toastIcon = 'checkmark-circle';
    let toastStatus: any = status ? status : 'success';
    switch (status) {
      case 'success':
        toastIcon = 'checkmark-circle';
        toastClass = 'toast_success';
        break;
      case 'error':
        toastIcon = 'warning';
        toastClass = 'toast_danger';
        toastStatus = 'danger';
        break;
      case 'warning':
        toastIcon = 'warning';
        toastClass = 'toast_warning';
        break;
      case 'light':
        toastIcon = 'alert';
        toastClass = 'toast_medium';
        break;
    }

    const toast = await this.toastCtrl.create({
      message: message,
      duration: toastDuration,
      position: toastPosition,
      color: toastStatus,
      cssClass: toastClass,
      buttons: [
        {
          icon: toastIcon,
          side: 'start',
          handler: () => false,
        },
        {
          icon: 'close',
          side: 'end',
          role: 'cancel',
        },
      ],
    });

    return await toast.present();
  }
  onDismiss() {
    this.modalCtrl.dismiss();
  }



}
