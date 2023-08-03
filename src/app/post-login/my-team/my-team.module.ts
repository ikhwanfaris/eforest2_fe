import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTeamComponent } from './my-team.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MyTeamComponent],
  imports: [
    CommonModule, 
    IonicModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    TranslateModule,
  ],
  exports: [
    MyTeamComponent,
    TranslateModule,
  ],
})
export class MyTeamModule {}
