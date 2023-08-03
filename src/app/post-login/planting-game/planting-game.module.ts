import { PlantingGameComponent } from './planting-game.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PlantingGameComponent],
  imports: [CommonModule, IonicModule],
  exports: [PlantingGameComponent],
})
export class PlantingGameModule {}
