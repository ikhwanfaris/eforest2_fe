import { PostNavbarModule } from './../post-navbar/post-navbar.module';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    // RouterModule.forChild(routes),
    // PostNavbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    TranslateModule,
  ],
  exports: [
    ProfileComponent,
    TranslateModule,
  ],
})
export class ProfileModule {}
