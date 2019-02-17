import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CenterInfoPage } from './center-info';

@NgModule({
  declarations: [
    CenterInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(CenterInfoPage),
  ],
})
export class CenterInfoPageModule {}
