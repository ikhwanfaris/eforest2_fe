import { PreNavbarModule } from '../pre-navbar/pre-navbar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    PreNavbarModule,
    TranslateModule,
  ],
  exports: [RouterModule,TranslateModule]
})
export class LoginModule { }
