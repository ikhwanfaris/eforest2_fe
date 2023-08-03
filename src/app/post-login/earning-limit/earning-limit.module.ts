import { PostNavbarModule } from '../post-navbar/post-navbar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TranslateModule } from '@ngx-translate/core';
import { EarningComponent } from './earning-limit.component';

const routes: Routes = [
  {
    path: '',
    component: EarningComponent,
  },
];

@NgModule({
  declarations: [EarningComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    PostNavbarModule,
    TranslateModule,
  ],
  exports: [
    RouterModule,
    TranslateModule,
  ],
})
export class EarningModule {}
