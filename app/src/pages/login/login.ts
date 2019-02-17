import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { CenterPage } from '../center/center';
import { LoginServiceProvider } from '../../providers/login-service/login-service'/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userEmail: string;
  userPassword: string;
  error: string;
  centerEmail: string;
  centerPassword: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginServiceProvider, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginAsUser() {
    this.loginService.loginAsUser(this.userEmail, this.userPassword).subscribe(data => {
      this.storage.set('id', data);
      this.navCtrl.setRoot(TabsPage);
    }, err => {
      this.error = 'Invalid Credentials'
    })
  }
  loginAsCenter() {
    this.loginService.loginAsCenter(this.centerEmail, this.centerPassword).subscribe(data => {
      this.storage.set('idCenter', data);
      console.log(data);
      this.navCtrl.setRoot(CenterPage);
    }, err => {
      this.error = 'Invalid Credentials'
    }, succ => {
      console.log('success')
    })
  }

}
