import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RequestInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request-info',
  templateUrl: 'request-info.html',
})
export class RequestInfoPage {
  info: any;
  receiver: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    if (this.navParams.get('data')[0])
      this.info = this.navParams.get('data')[0];
    else {
      this.info = this.navParams.get('data');
    }
    if (this.navParams.get('type') == false) {
      this.receiver = false;
    } else {
      this.receiver = true;
    }
    console.log(this.info);
  }

}
