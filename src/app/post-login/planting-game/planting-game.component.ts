import { SeedsService } from 'src/app/services/seed.service';
import { BasePage } from 'src/app/base-page/base-page';
import {
  Component,
  Input,
  OnInit,
  Injector,
  HostListener,
} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-planting-game',
  templateUrl: './planting-game.component.html',
  styleUrls: ['./planting-game.component.scss'],
})
export class PlantingGameComponent extends BasePage implements OnInit {
  constructor(
    private injector: Injector,
    private seedServ: SeedsService,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {
    super(injector);
  }
  @Input() packageRef;
  @Input() isPlanted = false;
  @Input() dayCount = 0;
  @Input() paid_out_amount = 0;
  @Input() package_name;
  isMobile = false;
  canFertilise = false;

  ngOnInit() {
    if (window.innerWidth < 768) {
      this.isMobile = true;
    }
    if (this.isPlanted) {
      this.seedsGrowth();
    }
    if (this.dayCount > 31) {
      if (this.package_name == 'T100' && this.paid_out_amount > 9.99)
        this.canFertilise = true;
      if (this.package_name == 'T500' && this.paid_out_amount > 49.99)
        this.canFertilise = true;
      if (this.package_name == 'T1K' && this.paid_out_amount > 99.99)
        this.canFertilise = true;
      if (this.package_name == 'T5K' && this.paid_out_amount > 499.99)
        this.canFertilise = true;
      if (this.package_name == 'T10K' && this.paid_out_amount > 999.99)
        this.canFertilise = true;
    }
    setTimeout(() => {
      const harvest = document.getElementById('harvest');
      if (harvest && Number(this.paid_out_amount) <= 0) {
        document.getElementById('harvest').classList.add('disabled');
        this.setAttribute(
          'harvest',
          'src',
          '.././../../assets/images/planting/basket_nocolor.png'
        );
      }
    }, 100);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth <= 768) {
      // 768px portrait
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  async basketplantSeed() {
    if (!this.isPlanted) {
      setTimeout(async () => {
        await this.showLoadingView();
        this.setAttribute(
          'game_container',
          'style',
          `background: url(../../../assets/images/planting/eF-planting-s1-1-1080p.gif?a=${Math.random()}); background-repeat: no-repeat; background-size: ${
            this.isMobile ? 'auto' : '100%'
          } 100%; background-position: center`
        );
        document.getElementById('not_planted_1').classList.add('disabled');
        this.setAttribute(
          'not_planted_1',
          'src',
          '.././../../assets/images/planting/00 img_0Grey.png'
        );
        this.dismissLoadingView();
      }, 100);
    }
  }

  async plantSeeds(num) {
    if (!this.isPlanted) {
      switch (num) {
        case 1:
          setTimeout(async () => {
            await this.showLoadingView();
            this.setAttribute(
              'game_container',
              'style',
              `background: url(../../../assets/images/planting/eF-planting-s1-1-1080p.gif?a=${Math.random()}); background-repeat: no-repeat; background-size: ${
                this.isMobile ? 'auto' : '100%'
              } 100%; background-position: center`
            );
            document.getElementById('not_planted_1').classList.add('disabled');
            this.setAttribute(
              'not_planted_1',
              'src',
              '.././../../assets/images/planting/00 img_0Grey.png'
            );
            this.dismissLoadingView();
          }, 100);

          setTimeout(() => {
            this.setAttribute(
              'game_container',
              'style',
              `background: url(../../../assets/images/planting/eF-planting-POS-s1-1-1080p.gif?a=${Math.random()}); background-repeat: no-repeat; background-size: ${
                this.isMobile ? 'auto' : '100%'
              } 100%; background-position: center`
            );
            document
              .getElementById('not_planted_2')
              .classList.remove('disabled');
            this.setAttribute(
              'not_planted_2',
              'src',
              '.././../../assets/images/planting/02 img_1.png'
            );
          }, 3000);
          break;
        case 2:
          setTimeout(async () => {
            await this.showLoadingView();
            this.setAttribute(
              'game_container',
              'style',
              `background: url(../../../assets/images/planting/eF-planting-s1-2-1080p.gif?a=${Math.random()}); background-repeat: no-repeat; background-size: ${
                this.isMobile ? 'auto' : '100%'
              } 100%; background-position: center`
            );
            document.getElementById('not_planted_2').classList.add('disabled');
            this.setAttribute(
              'not_planted_2',
              'src',
              '.././../../assets/images/planting/02 img_1Grey.png'
            );
            this.dismissLoadingView();
          }, 100);

          setTimeout(() => {
            this.setAttribute(
              'game_container',
              'style',
              `background: url(../../../assets/images/planting/eF-planting-POS-s1-1-1080p.gif?a=${Math.random()}); background-repeat: no-repeat; background-size: ${
                this.isMobile ? 'auto' : '100%'
              } 100%; background-position: center`
            );
            document
              .getElementById('not_planted_3')
              .classList.remove('disabled');
            document.getElementById('not_planted_2').classList.add('disabled');
            this.setAttribute(
              'not_planted_3',
              'src',
              '.././../../assets/images/planting/04 img_2.png'
            );
          }, 3000);
          break;
        case 3:
          setTimeout(async () => {
            await this.showLoadingView();
            this.setAttribute(
              'game_container',
              'style',
              `background: url(../../../assets/images/planting/eF-planting-s1-3-1080p.gif?a=${Math.random()}); background-repeat: no-repeat; background-size: ${
                this.isMobile ? 'auto' : '100%'
              } 100%; background-position: center`
            );

            document.getElementById('not_planted_3').classList.add('disabled');
            this.setAttribute(
              'not_planted_3',
              'src',
              '.././../../assets/images/planting/04 img_2Grey.png'
            );
            this.dismissLoadingView();
          }, 100);

          setTimeout(() => {
            this.setAttribute(
              'game_container',
              'style',
              `background: url(../../../assets/images/planting/eF-planting-POS-s1-3-1080p.gif?a=${Math.random()}); background-repeat: no-repeat; background-size: ${
                this.isMobile ? 'auto' : '100%'
              } 100%; background-position: center`
            );
            document
              .getElementById('not_planted_4')
              .classList.remove('disabled');
            this.setAttribute(
              'not_planted_4',
              'src',
              '.././../../assets/images/planting/06 img_3.png'
            );
          }, 3000);
          break;
        case 4:
          setTimeout(async () => {
            await this.showLoadingView();
            this.setAttribute(
              'game_container',
              'style',
              `background: url(../../../assets/images/planting/eF-planting-s1-4-1080p.gif?a=${Math.random()}); background-repeat: no-repeat; background-size: ${
                this.isMobile ? 'auto' : '100%'
              } 100%; background-position: center`
            );
            document.getElementById('not_planted_4').classList.add('disabled');
            this.setAttribute(
              'not_planted_4',
              'src',
              '.././../../assets/images/planting/06 img_3Grey.png'
            );
            this.dismissLoadingView();
          }, 100);

          try {
            const result = await this.seedServ.updateSeedsPlanted(
              this.packageRef
            );
            setTimeout(async () => {
              this.setAttribute(
                'game_container',
                'style',
                `background: url(../../../assets/images/planting/eF-planting-POS-s1-3-1080p.gif?a=${Math.random()}); background-repeat: no-repeat; background-size: ${
                  this.isMobile ? 'auto' : '100%'
                } 100%; background-position: center`
              );
              this.showToast(await this.getTrans('PLANT_SUCCESS'));
            }, 3000);
          } catch (e) {
            this.showToast(e.error.message, 3000, 'top', 'error');
            document
              .getElementById('not_planted_4')
              .classList.remove('disabled');
            this.setAttribute(
              'not_planted_4',
              'src',
              '.././../../assets/images/planting/06 img_3.png'
            );
          }
          break;
      }
    }
  }

  setAttribute(id, attrName, attrVal) {
    document.getElementById(id).setAttribute(attrName, attrVal);
  }

  async seedsGrowth() {
    let animation = 'eF-planting-POS-s1-3-1080p';
    switch (true) {
      case this.dayCount >= 1 && this.dayCount <= 3:
        animation = 'PreComp_S2Tree-1080p-LOOP';
        break;
      case this.dayCount >= 4 && this.dayCount <= 6:
        animation = 'PreComp_S3Tree-1080p-LOOP';
        break;
      case this.dayCount >= 7 && this.dayCount <= 9:
        animation = 'PreComp_S4Tree-1080p-LOOP';
        break;
      case this.dayCount >= 10 && this.dayCount <= 12:
        animation = 'PreComp_S5Tree-1080p-LOOP';
        break;
      case this.dayCount >= 13 && this.dayCount <= 15:
        animation = 'PreComp_S6Tree-1080p-LOOP';
        break;
      case this.dayCount >= 16 && this.dayCount <= 18:
        animation = 'PreComp_S7Tree-1080p-LOOP';
        break;
      case this.dayCount >= 19 && this.dayCount <= 21:
        animation = 'PreComp_S8Tree-1080p-LOOP';
        break;
      case this.dayCount >= 22 && this.dayCount <= 24:
        animation = 'PreComp_S9Tree-1080p-LOOP';
        break;
      case this.dayCount >= 25 && this.dayCount <= 27:
        animation = 'PreComp_S10Tree-1080p-LOOP';
        break;
      case this.dayCount >= 28 && this.dayCount <= 30:
        animation = 'PreComp_S11Tree-1080p-LOOP';
        break;
      case this.dayCount >= 31:
        animation = 'PreComp_S12Tree-1080p-LOOP';
        break;
    }

    this.setAttribute(
      'game_container',
      'style',
      `background: url(../../../assets/images/watering/${animation}.gif?a=${Math.random()}); background-repeat: no-repeat; background-size: ${
        this.isMobile ? 'auto' : '100%'
      } 100%; background-position: center`
    );
  }

  async germinateSeeds() {
    let preAnimation = 'PreComp_S2Tree-1080p';
    let postAnimation = 'PreComp_S2Tree-1080p-LOOP';
    switch (true) {
      case this.dayCount >= 1 && this.dayCount <= 2:
        preAnimation = 'PreComp_S2Tree-1080p-Water';
        postAnimation = 'PreComp_S2Tree-1080p-LOOP';
        break;
      case this.dayCount == 3:
        preAnimation = 'PreComp_S3Tree-1080p';
        postAnimation = 'PreComp_S3Tree-1080p-LOOP';
        break;
      case this.dayCount >= 4 && this.dayCount <= 5:
        preAnimation = 'PreComp_S3Tree-1080p-Water';
        postAnimation = 'PreComp_S3Tree-1080p-LOOP';
        break;
      case this.dayCount == 6:
        preAnimation = 'PreComp_S4Tree-1080p';
        postAnimation = 'PreComp_S4Tree-1080p-LOOP';
        break;
      case this.dayCount >= 7 && this.dayCount <= 8:
        preAnimation = 'PreComp_S4Tree-1080p-Water';
        postAnimation = 'PreComp_S4Tree-1080p-LOOP';
        break;
      case this.dayCount == 9:
        preAnimation = 'PreComp_S5Tree-1080p';
        postAnimation = 'PreComp_S5Tree-1080p-LOOP';
        break;
      case this.dayCount >= 10 && this.dayCount <= 11:
        preAnimation = 'PreComp_S5Tree-1080p-Water';
        postAnimation = 'PreComp_S5Tree-1080p-LOOP';
        break;
      case this.dayCount == 12:
        preAnimation = 'PreComp_S6Tree-1080p';
        postAnimation = 'PreComp_S6Tree-1080p-LOOP';
        break;
      case this.dayCount >= 13 && this.dayCount <= 14:
        preAnimation = 'PreComp_S6Tree-1080p-Water';
        postAnimation = 'PreComp_S6Tree-1080p-LOOP';
        break;
      case this.dayCount == 15:
        preAnimation = 'PreComp_S7Tree-1080p';
        postAnimation = 'PreComp_S7Tree-1080p-LOOP';
        break;
      case this.dayCount >= 16 && this.dayCount <= 17:
        preAnimation = 'PreComp_S7Tree-1080p-Water';
        postAnimation = 'PreComp_S7Tree-1080p-LOOP';
        break;
      case this.dayCount == 18:
        preAnimation = 'PreComp_S8Tree-1080p';
        postAnimation = 'PreComp_S8Tree-1080p-LOOP';
        break;
      case this.dayCount >= 19 && this.dayCount <= 20:
        preAnimation = 'PreComp_S8Tree-1080p-Water';
        postAnimation = 'PreComp_S8Tree-1080p-LOOP';
        break;
      case this.dayCount == 21:
        preAnimation = 'PreComp_S9Tree-1080p';
        postAnimation = 'PreComp_S9Tree-1080p-LOOP';
        break;
      case this.dayCount >= 22 && this.dayCount <= 23:
        preAnimation = 'PreComp_S9Tree-1080p-Water';
        postAnimation = 'PreComp_S9Tree-1080p-LOOP';
        break;
      case this.dayCount == 24:
        preAnimation = 'PreComp_S10Tree-1080p';
        postAnimation = 'PreComp_S10Tree-1080p-LOOP';
        break;
      case this.dayCount >= 25 && this.dayCount <= 26:
        preAnimation = 'PreComp_S10Tree-1080p-Water';
        postAnimation = 'PreComp_S10Tree-1080p-LOOP';
        break;
      case this.dayCount == 27:
        preAnimation = 'PreComp_S11Tree-1080p';
        postAnimation = 'PreComp_S11Tree-1080p-LOOP';
        break;
      case this.dayCount >= 28:
        preAnimation = 'PreComp_S11Tree-1080p-Water';
        postAnimation = 'PreComp_S11Tree-1080p-LOOP';
        break;
    }

    if (this.isPlanted) {
      try {
        const germinate = await this.seedServ.updateSeedsGerminate(
          this.packageRef
        );

        setTimeout(async () => {
          await this.showLoadingView();
          this.setAttribute(
            'game_container',
            'style',
            `background: url(../../../assets/images/watering/${preAnimation}.gif?a=${Math.random()}); background-repeat: no-repeat; background-size: ${
              this.isMobile ? 'auto' : '100%'
            } 100%; background-position: center`
          );
          document.getElementById('planted_1').classList.add('disabled');
          this.setAttribute(
            'planted_1',
            'src',
            '.././../../assets/images/planting/06 img_3Grey.png'
          );
          this.dismissLoadingView();
        }, 100);

        setTimeout(async () => {
          this.setAttribute(
            'game_container',
            'style',
            `background: url(../../../assets/images/watering/${postAnimation}.gif?a=${Math.random()}); background-repeat: no-repeat; background-size: ${
              this.isMobile ? 'auto' : '100%'
            } 100%; background-position: center`
          );
          this.showToast(await this.getTrans('GERMINATE_SUCCESS'));
        }, 3000);
      } catch (e) {
        this.showToast(e.error.message, 3000, 'top', 'error');
        console.log(e);
      }
    }
  }

  async waterSeeds() {
    let preAnimation = 'PreComp_S12Tree-1080p-Water';
    let postAnimation = 'PreComp_S12Tree-1080p-LOOP';
    if (this.isPlanted) {
      try {
        const germinate = await this.seedServ.waterSeed(this.packageRef);

        setTimeout(async () => {
          await this.showLoadingView();
          this.setAttribute(
            'game_container',
            'style',
            `background: url(../../../assets/images/watering/${preAnimation}.gif?a=${Math.random()}); background-repeat: no-repeat; background-size: ${
              this.isMobile ? 'auto' : '100%'
            } 100%; background-position: center`
          );
          document.getElementById('planted_1').classList.add('disabled');
          this.setAttribute(
            'planted_1',
            'src',
            '.././../../assets/images/planting/06 img_3Grey.png'
          );
          this.dismissLoadingView();
        }, 100);

        setTimeout(async () => {
          this.setAttribute(
            'game_container',
            'style',
            `background: url(../../../assets/images/watering/${postAnimation}.gif?a=${Math.random()}); background-repeat: no-repeat; background-size: ${
              this.isMobile ? 'auto' : '100%'
            } 100%; background-position: center`
          );
          this.showToast(await this.getTrans('WATER_SUCCESS'));
        }, 4000);
      } catch (e) {
        this.showToast(e.error.message, 3000, 'top', 'error');
        console.log(e);
      }
    }
  }

  async fertiliseSeeds() {
    let preAnimation = 'PreComp_S13Tree-1080p-Fertilize';
    let postAnimation = 'PreComp_S13Tree-1080p-LOOP2';

    const alertCtrl = await this.alertCtrl.create({
      header: await this.getTrans('FERTILISE_PROMPT_HEADER'),
      message: await this.getTrans('FERTILISE_PROMPT_MESSAGE'),
      cssClass: 'plantAlert',
      buttons: [
        {
          text: await this.getTrans('CANCEL'),
          role: 'cancel',
        },
        {
          text: await this.getTrans('CONFIRM'),
          handler: async () => {
            try {
              const germinate = await this.seedServ.fertiliseSeed(
                this.packageRef
              );
              // console.log(germinate);
              setTimeout(async () => {
                await this.showLoadingView();
                this.setAttribute(
                  'game_container',
                  'style',
                  `background: url(../../../assets/images/watering/${preAnimation}.gif?a=${Math.random()}); background-repeat: no-repeat; background-size: ${
                    this.isMobile ? 'auto' : '100%'
                  } 100%; background-position: center`
                );
                document.getElementById('harvest').classList.add('disabled');
                this.setAttribute(
                  'harvest',
                  'src',
                  '.././../../assets/images/planting/basket_nocolor.png'
                );
                this.canFertilise = false;
                this.dismissLoadingView();
              }, 100);

              setTimeout(async () => {
                this.setAttribute(
                  'game_container',
                  'style',
                  `background: url(../../../assets/images/watering/${postAnimation}.gif?a=${Math.random()}); background-repeat: no-repeat; background-size: ${
                    this.isMobile ? 'auto' : '100%'
                  } 100%; background-position: center`
                );
                this.showToast(germinate.message);
              }, 4000);
            } catch (e) {
              this.showToast(e.error.message, 3000, 'top', 'error');
              console.log(e);
            }
            this.ngOnInit();
          },
        },
      ],
    });
    await alertCtrl.present();
  }

  async havestBasket() {
    let prebasketAnimation = 'PreComp_S14Tree-1080p';
    let postbasketAnimation = 'PreComp_S12Tree-1080p-LOOP';
    if (this.isPlanted) {
      const alertCtrl = await this.alertCtrl.create({
        header: await this.getTrans('HARVEST_PROMPT_HEADER'),
        message: await this.getTrans('HARVEST_PROMPT_MESSAGE'),
        cssClass: 'plantAlert',
        buttons: [
          {
            text: await this.getTrans('CANCEL'),
            role: 'cancel',
          },
          {
            text: await this.getTrans('CONFIRM'),
            handler: async () => {
              try {
                const germinate = await this.seedServ.havestBaskets(
                  this.packageRef
                );

                setTimeout(async () => {
                  await this.showLoadingView();
                  this.setAttribute(
                    'game_container',
                    'style',
                    `background: url(../../../assets/images/watering/${prebasketAnimation}.gif?a=${Math.random()}); background-repeat: no-repeat; background-size: ${
                      this.isMobile ? 'auto' : '100%'
                    } 100%; background-position: center`
                  );
                  document.getElementById('harvest').classList.add('disabled');
                  // document.getElementById('planted_1').classList.add('disabled');
                  this.setAttribute(
                    'harvest',
                    'src',
                    '.././../../assets/images/planting/basket_nocolor.png'
                  );
                  // this.setAttribute(
                  //   'planted_1',
                  //   'src',
                  //   '.././../../assets/images/planting/06 img_3Grey.png'
                  // );
                  this.canFertilise = false;
                  this.dismissLoadingView();
                }, 100);

                setTimeout(async () => {
                  this.setAttribute(
                    'game_container',
                    'style',
                    `background: url(../../../assets/images/watering/${postbasketAnimation}.gif?a=${Math.random()}); background-repeat: no-repeat; background-size: ${
                      this.isMobile ? 'auto' : '100%'
                    } 100%; background-position: center`
                  );
                  this.showToast(await this.getTrans('HARVEST_SUCCESS'));
                  this.authService.userDetails().then(() => {
                    this.authService.getSeedBalance();
                  });
                }, 4000);
              } catch (e) {
                this.showToast(e.error.message, 3000, 'top', 'error');
                console.log(e);
              }
            },
          },
        ],
      });
      await alertCtrl.present();
    }
  }

  onDismiss() {
    this.modalCtrl.dismiss({ isPlanted: this.isPlanted });
  }
}
