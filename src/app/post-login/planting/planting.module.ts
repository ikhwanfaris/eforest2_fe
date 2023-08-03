import { PlantingComponent } from './planting.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PlantingComponent],
  imports: [CommonModule, IonicModule, TranslateModule],
  exports: [PlantingComponent],
})
export class PlantingModule {}
