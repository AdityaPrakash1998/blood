import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BloodbankPage } from './bloodbank';

@NgModule({
  declarations: [
    BloodbankPage,
  ],
  imports: [
    IonicPageModule.forChild(BloodbankPage),
  ],
})
export class BloodbankPageModule {}
