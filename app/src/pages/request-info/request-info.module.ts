import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestInfoPage } from './request-info';

@NgModule({
  declarations: [
    RequestInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestInfoPage),
  ],
})
export class RequestInfoPageModule {}
