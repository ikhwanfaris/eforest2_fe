import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDirectBonusComponent } from './my-direct-bonus.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MyDirectBonusComponent],
  imports: [
    CommonModule, 
    IonicModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    TranslateModule,
  ],
  exports: [
    MyDirectBonusComponent,
    TranslateModule,
  ],
})
export class MyDirectBonusModule {}


