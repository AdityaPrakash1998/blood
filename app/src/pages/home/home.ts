import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { BloodbankPage } from '../bloodbank/bloodbank';
import { HospitalPage } from '../hospital/hospital';
import { UserInfoPage } from '../user-info/user-info';
import { AboutPage } from '../about/about';

// declare var MapmyIndia;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Events = [{
    name: 'Blood Donation Event',
    des: 'New blood donation event at NAYA RAIPUR'
  }, {
    name: 'Blood Donation Event',
    des: 'Shrishti blood bank 22/03/19'
  }, {
    name: 'Blood Donation Event',
    des: 'NIT Raipur 13/04/19'
  }, {
    name: 'Blood Donation Event',
    des: 'New blood donation event'
  }]
  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController) {

  }
  pushList() {
    this.navCtrl.push(UserInfoPage);
  }
  history() {
    this.navCtrl.push(AboutPage);
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Select Options',
      buttons: [
        {
          text: 'Find Hospitals',
          handler: () => {
            this.navCtrl.push(HospitalPage);
          }
        }, {
          text: 'Find Blood Banks',
          handler: () => {//Done
            this.navCtrl.push(BloodbankPage);
          }
        },
        {
          text: 'Find Donors',
          handler: () => {
            this.navCtrl.push(UserInfoPage);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  // ionViewDidLoad() {
  //   console.log('HI')
  //   var map = document.getElementById('map');
  //   var maps = new MapmyIndia.Map('map', { center: [28.61, 77.23], zoomControl: true, hybrid: true });
  // }

}
