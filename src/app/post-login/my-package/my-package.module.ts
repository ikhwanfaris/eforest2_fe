import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPackageComponent } from './my-package.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MyPackageComponent],
  imports: [CommonModule, IonicModule, TranslateModule],
  exports: [MyPackageComponent, TranslateModule],
})
export class MyPackageModule {}
