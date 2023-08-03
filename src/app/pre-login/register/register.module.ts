import { RegisterComponent } from './register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { PreNavbarModule } from '../pre-navbar/pre-navbar.module';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
  }
];


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    PreNavbarModule,
    TranslateModule
  ],
  exports: [RouterModule,TranslateModule]
})
export class RegisterModule { }
