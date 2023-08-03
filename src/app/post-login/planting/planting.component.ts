import { BannerAdsComponent } from './../../banner-ads/banner-ads.component';
import { SeedsService } from 'src/app/services/seed.service';
import { PlantingGameComponent } from './../planting-game/planting-game.component';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { UserPlantedDetailModel } from 'src/app/models/seeds.model';
import { IonAccordionGroup } from '@ionic/angular';

@Component({
  selector: 'app-planting',
  templateUrl: './planting.component.html',
  styleUrls: ['./planting.component.scss'],
})
export class PlantingComponent extends BasePage implements OnInit {
  not_planted_length = 0;
  planted_length = 0;
  day_count = 0;
  not_planted: UserPlantedDetailModel[] = [];
  planted: UserPlantedDetailModel[] = [];
  @ViewChild('plantedAccordion', { static: true })
  plantedAccordion: IonAccordionGroup;
  @ViewChild('notPlantedAccordion', { static: true })
  notPlantedAccordion: IonAccordionGroup;
  isGerminateDisable = false;
  isWaterDisable = false;

  constructor(public injector: Injector, private seedServ: SeedsService) {
    super(injector);
  }

  async ngOnInit() {
    await this.showLoadingView();
    try {
      const germinateToday = [];
      const waterToday = [];
      const userPlanted = await this.seedServ.userPlantedList();
      if (userPlanted.success) {
        this.planted_length = userPlanted.data.length > 0 ? 1 : 0;
        this.planted = userPlanted.data;
        // if (this.planted_length == 0) {
        document
          .getElementById('plantedAccordion')
          .setAttribute(
            'style',
            `display: ${this.planted_length == 0 ? 'none' : 'block'}`
          );
        // }
        this.planted.find((val) => {
          if (val.day_count < 31 && val.watered_today == 0) {
            germinateToday.push(val);
          }
          if (val.day_count >= 31 && val.watered_today == 0) {
            waterToday.push(val);
          }
        });
        if (germinateToday.length == 0) {
          this.isGerminateDisable = true;
        } else {
          this.isGerminateDisable = false;
        }
        if (waterToday.length == 0) {
          this.isWaterDisable = true;
        } else {
          this.isWaterDisable = false;
        }
      }
    } catch (e) {
      this.showToast(e.error.message, 3000, 'top', 'error');
    }
    try {
      const userNotPlanted = await this.seedServ.userNonPlantedList();
      if (userNotPlanted.success) {
        this.not_planted_length = userNotPlanted.data.length > 0 ? 1 : 0;
        this.not_planted = userNotPlanted.data;
        // if (this.not_planted_length == 0) {
        document
          .getElementById('notPlantedAccordion')
          .setAttribute(
            'style',
            `display: ${this.not_planted_length == 0 ? 'none' : 'block'}`
          );
        // }
      }
    } catch (e) {
      this.showToast(e.error.message, 3000, 'top', 'error');
    }

    if (this.not_planted_length > 0 && this.planted.length == 0) {
      const notPlantedAccordion = this.notPlantedAccordion;
      if (!notPlantedAccordion.value) {
        notPlantedAccordion.value = 'notPlanted';
      }
    }

    if (this.planted.length > 0) {
      const plantedAccordion = this.plantedAccordion;
      if (!plantedAccordion.value) {
        plantedAccordion.value = 'planted';
      }
    }
    this.dismissLoadingView();
  }

  async loadFarm(id, isPlanted, dayCount, paid_out_amount, package_name) {
    // this.isGameOpen = true;
    let modal = await this.modalCtrl.create({
      component: PlantingGameComponent,
      componentProps: {
        packageRef: id,
        isPlanted: isPlanted,
        dayCount: dayCount,
        paid_out_amount: paid_out_amount,
        package_name: package_name,
      },
      cssClass: 'gameModal',
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {
      modal = null;
      this.ngOnInit().then(() => {
        const plantedAccordion = this.plantedAccordion;
        const notPlantedAccordion = this.notPlantedAccordion;

        if (!data.data.isPlanted) {
          if (notPlantedAccordion.value) {
            notPlantedAccordion.value = '';
          }
          if (!plantedAccordion.value) {
            plantedAccordion.value = 'planted';
          }
          document.getElementById('notPlantedAccordion').scrollIntoView({
            behavior: 'smooth',
          });
        }
      });
    });
    return await modal.present();
  }

  async germinateAll() {
    try {
      let modal = await this.modalCtrl.create({
        component: BannerAdsComponent,
        cssClass: 'adModal',
        backdropDismiss: false,
      });
      modal.onDidDismiss().then(() => {
        modal = null;
        this.ngOnInit().then(async () => {
          const result = await this.seedServ.germinateAll();
          if (result.success) {
            this.ngOnInit();
          }
          this.showToast(result.message);
        });
      });
      await modal.present();
    } catch (e) {
      this.showToast(e.error.message, 3000, 'top', 'error');
    }
    // this.ngOnInit();
  }
  async waterAll() {
    try {
      let modal = await this.modalCtrl.create({
        component: BannerAdsComponent,
        cssClass: 'adModal',
        backdropDismiss: false,
      });
      modal.onDidDismiss().then(() => {
        modal = null;
        this.ngOnInit().then(async () => {
          const result = await this.seedServ.waterAll();
          if (result.success) {
            this.ngOnInit();
          }
          this.showToast(result.message);
        });
      });
      await modal.present();
    } catch (e) {
      this.showToast(e.error.message, 3000, 'top', 'error');
    }
  }

  onDismiss() {
    this.modalCtrl.dismiss();
    // this.isGameOpen = false;
  }

  getPackageColor(packageName) {
    switch (packageName) {
      case 'T100':
        return '#d6d286';
      case 'T500':
        return '#738700';
      case 'T1K': //
        return '#38720c';
      case 'T5K': //
        return '#366006';
      case 'T10K': //
        return '#16402a';
      default:
        return '#000';
    }
  }

  getPackageImages(planted, day_count) {
    if (planted == 0) {
      return '../../../assets/images/planting_progress/Artboard 0-80.jpg';
    } else {
      switch (true) {
        case day_count == 0:
          return '../../../assets/images/planting_progress/eF-planting-POS-s1-4-500.jpg';
        case day_count <= 3:
          return '../../../assets/images/planting_progress/Artboard 1-80.jpg';
        case day_count <= 6:
          return '../../../assets/images/planting_progress/Artboard 2-80.jpg';
        case day_count <= 9:
          return '../../../assets/images/planting_progress/Artboard 3-80.jpg';
        case day_count <= 12:
          return '../../../assets/images/planting_progress/Artboard 4-80.jpg';
        case day_count <= 15:
          return '../../../assets/images/planting_progress/Artboard 5-80.jpg';
        case day_count <= 18:
          return '../../../assets/images/planting_progress/Artboard 6-80.jpg';
        case day_count <= 21:
          return '../../../assets/images/planting_progress/Artboard 7-80.jpg';
        case day_count <= 24:
          return '../../../assets/images/planting_progress/Artboard 8-80.jpg';
        case day_count <= 27:
          return '../../../assets/images/planting_progress/Artboard 9-80.jpg';
        case day_count >= 28:
          return '../../../assets/images/planting_progress/Artboard 10-80.jpg';
      }
    }
  }
}
