import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  info: any = {
    name: 'Aditya Chandel',
    address: 'NIT Raipur',
    bmi: 20.034023,
    number: '9044374772',
    donor: true
  };
  constructor(public navCtrl: NavController, private storage: Storage, public http: HttpClient, private alertCtrl: AlertController) {
  }
  ionViewWillLoad() {
    var self = this;
    this.storage.get('id').then(val => {
      this.http.get(`https://03af7f6c.ngrok.io/api/user/${val}`).subscribe(data => {
        console.log(data);
        self.info = data;
      }, err => console.log(err))
    })
  }
  update() {
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
          name: 'Name',
          placeholder: 'Name',
          type: 'text'
        },
        {
          name: 'number',
          placeholder: 'Number',
          type: 'text'
        },
        {
          name: 'BMI',
          placeholder: 'BMI',
          type: 'text'
        },
        {
          name: 'address',
          placeholder: 'Address',
          type: 'text'
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
            self.info.name = data.Name;
            self.info.number = data.number;
            self.info.bmi = data.BMI;
            self.info.address = data.address
          }
        }
      ]
    });
    alert.present();
  }



}
