import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CenterInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-center-info',
  templateUrl: 'center-info.html',
})
export class CenterInfoPage {
  profile: any;
  units: number;
  bloodGroup;
  deadline: number;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, private storage: Storage, private alertCtrl: AlertController, public http: HttpClient) {
  }

  closeModal() {
    this.viewCtrl.dismiss({ route: false });
  }

  getRoute() {
    this.viewCtrl.dismiss({ profile: this.profile, route: true });
  }

  createRequest() {

  }

  sendRequest() {
    var self = this;
    this.storage.get('id').then((val) => {
      this.http.post(`http://03af7f6c.ngrok.io/api/request/center/create/${this.profile.eLoc}`, {
        "senderId": val, "bloodGroup": `${this.bloodGroup}`, "bloodUnits": `${this.units}`, "deadline": `${this.deadline}`
      }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .subscribe((data) => {
          self.viewCtrl.dismiss({ route: false });
        }, err => {
          console.log(err)
        })
    }).catch(err => {
      console.log(err);
    });


  }

  // presentPrompt = () => {
  //   let alert = this.alertCtrl.create({
  //     title: 'Create',
  //     inputs: [
  //       // {
  //       //   name: 'BloodGroup',
  //       //   placeholder: 'Blood Group',
  //       //   label: 'Blood Group'
  //       // },
  //       {
  //         type: 'radio',
  //         name: 'type',
  //         label: 'O+',
  //         value: 'O+'
  //       },
  //       {
  //         type: 'radio', name: 'type',
  //         label: 'O-',
  //         value: 'O-'
  //       },
  //       {
  //         type: 'radio', name: 'type',
  //         label: 'B+',
  //         value: 'B+'
  //       },
  //       {
  //         type: 'radio', name: 'type',
  //         label: 'B-',
  //         value: 'B-'
  //
  //       },
  //       {
  //         type: 'radio', name: 'type',
  //         label: 'A+',
  //         value: 'A+'
  //
  //       },
  //       {
  //         type: 'radio', name: 'type',
  //         label: 'A-',
  //         value: 'A-'
  //
  //       }, {
  //         type: 'radio', name: 'type',
  //         label: 'AB+',
  //         value: 'AB+'
  //
  //       }, {
  //         type: 'radio', name: 'type',
  //         label: 'AB-',
  //         value: 'AB-'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: data => {
  //           console.log(data);
  //         }
  //       },
  //       {
  //         text: 'Send',
  //         handler: data => {
  //
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

  ionViewWillLoad() {
    this.profile = this.navParams.get('data');
  }

}
