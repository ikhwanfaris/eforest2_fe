import { ErrorComponent } from './error.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: ErrorComponent,
  }
];


@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ErrorModule { }
