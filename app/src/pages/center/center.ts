import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { LoginPage } from '../login/login';
/**
 * Generated class for the CenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-center',
  templateUrl: 'center.html',
})
export class CenterPage {
  name: string;
  address: string;
  invent;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private alertCtrl: AlertController, public http: HttpClient, public plt: Platform) {
    this.plt.ready().then(() => {

    }).catch(err => console.log(err));
  }

  ionViewDidLoad() {
    var self = this;
    this.storage.get('idCenter').then(val => {
      this.http.get(`https://19ee4cec.ngrok.io/api/center/bloodBank/${val}`).subscribe(data => {
        self.info = data;
        self.name = data.centerName;
        self.address = data.centerAddress;
        self.invent = data.inventory;
        //console.log(self.info);
      }, err => { console.log(err) })
    }).catch(err => console.log(err));
    console.log('ionViewDidLoad CenterPage');
  }

  setUpdate() {
    this.presentPrompt();
  }
  logout() {
    this.navCtrl.setRoot(LoginPage);
  }

  presentPrompt = () => {
    var self = this;
    let alert = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'A Positive',
          placeholder: 'Number of Units A+',
          type: 'number'
        },
        {
          name: 'A Negative',
          placeholder: 'Number of Units A-',
          type: 'number'
        },
        {
          name: 'B Positive',
          placeholder: 'Number of Units B+',
          type: 'number'
        },
        {
          name: 'B Negative',
          placeholder: 'Number of Units B-',
          type: 'number'
        },
        {
          name: 'AB Positive',
          placeholder: 'Number of Units AB+',
          type: 'number'
        },
        {
          name: 'AB Negative',
          placeholder: 'Number of Units AB-',
          type: 'number'
        },
        {
          name: 'O Positive',
          placeholder: 'Number of Units O+',
          type: 'number'
        },
        {
          name: 'O Negative',
          placeholder: 'Number of Units O-',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Update',
          handler: data => {
            var object = [{
              "bloodGroup": "A Positive",
              "quantity": data["A Positive"]
            },
            {
              "bloodGroup": "A Negative",
              "quantity": data["A Negative"]
            },
            {
              "bloodGroup": "B Positive",
              "quantity": data["B Positive"]
            },
            {
              "bloodGroup": "B Negative",
              "quantity": data["B Negative"]
            },
            {
              "bloodGroup": "AB Positive",
              "quantity": data["AB Positive"]
            },
            {
              "bloodGroup": "AB Negative",
              "quantity": data["AB Negative"]
            },
            {
              "bloodGroup": "O Positive",
              "quantity": data["O Positive"]
            },
            {
              "bloodGroup": "O Negative",
              "quantity": data["O Negative"]
            }]

            this.http.post(`https://19ee4cec.ngrok.io/api/center/updateInventory`, { eLoc: self.info.eLoc, inventory: object }, { headers: { 'Content-Type': 'application/json' } })
              .subscribe(data => { self.invent = data.inventory; console.log(data) }, err => console.log(err));
          }
        }
      ]
    });
    alert.present();
  }

}
