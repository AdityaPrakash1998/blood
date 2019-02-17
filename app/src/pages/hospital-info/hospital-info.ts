import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HospitalInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hospital-info',
  templateUrl: 'hospital-info.html',
})
export class HospitalInfoPage {
  profile: any = {};
  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
  }
  getRoute() {
    this.viewCtrl.dismiss({ profile: this.profile, route: true });
  }
  closeModal() {
    this.viewCtrl.dismiss({ route: false });
  }
  ionViewWillLoad() {
    this.profile = this.navParams.get('data');
  }

}
