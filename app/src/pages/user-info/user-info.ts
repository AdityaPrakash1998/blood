import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapServiceProvider } from '../../providers/map-service/map-service';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
/**
 * Generated class for the UserInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {
  users: any;
  currentUser: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public alertCtrl: AlertController,
    private bSer: MapServiceProvider,
    private geolocation: Geolocation,
    public http: HttpClient,
    private localNotifications: LocalNotifications) {
    var self = this;
    this.geolocation.getCurrentPosition().then(resp => {
      self.bSer.getUsers(resp.coords.latitude, resp.coords.longitude).subscribe(data => {
        self.users = data;
        console.log(self.users);
      }, err => console.log(err));
    }).catch(err => console.log('Error getting Location', err));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInfoPage');
  }

  showPrompt = () => {
    var self = this;
    const prompt = this.alertCtrl.create({
      title: 'Direct Request',
      message: "Enter the Request Details",
      inputs: [
        {
          name: 'unit',
          placeholder: 'Number of units',
          type: 'number'
        },
        {
          name: 'deadline',
          placeholder: 'Deadline in hours',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.storage.get('id').then(val => {
              this.http.post(`https://19ee4cec.ngrok.io/api/request/user/create/${this.currentUser.userId}`, { "senderId": val, "bloodGroup": this.currentUser.bloodGroup, "deadline": data.deadline, "bloodUnits": data.unit, "number": this.currentUser.number }, { headers: { 'Content-Type': 'application/json' } })
                .subscribe(data => {
                  console.log(data);
                  self.localNotifications.schedule({
                    id: 1,
                    text: 'Request Accepted',
                    sound: 'file://sound.mp3'
                  });
                }, err => {
                  console.log(err);
                });
            }).catch(err => console.log(err));
          }
        }
      ]
    });
    prompt.present();
  }


  createRequest(user) {
    this.currentUser = user;
    this.showPrompt();
  }

}
