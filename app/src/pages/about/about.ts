import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapServiceProvider } from '../../providers/map-service/map-service';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { RequestInfoPage } from '../request-info/request-info';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  id;
  requests: any;
  typeOfReq: boolean;

  constructor(public navCtrl: NavController, private bSer: MapServiceProvider, private storage: Storage, public http: HttpClient) {

  }
  ionViewDidEnter() {
    this.req("sent");
  }
  req = (types) => {

    if (types == "sent") {
      this.storage.get('id').then(val => {
        this.id = val;
        this.typeOfReq = false;
        this.bSer.stateZ(this.id).subscribe(val => this.requests = val, err => console.log(err));
        //this.bSer.state1(this.id).subscribe(val => this.received = val, err => console.log(err));
        //this.bSer.state2(this.id).subscribe(val => this.done = val, err => console.log(err));
        // console.log(this.received);
        // console.log(this.done);
      }).catch(err => console.log(err));
    } else if (types == "received") {
      this.typeOfReq = true;
      this.storage.get('id').then(val => {
        this.id = val;
        this.bSer.stateO(this.id).subscribe(val => this.requests = val, err => console.log(err));
      }
        //this.bSer.state1(this.id).subscribe(val => this.received = val, err => console.log(err));
        //this.bSer.state2(this.id).subscribe(val => this.done = val, err => console.log(err));
        // console.log(this.received);
        // console.log(this.done);
      ).catch(err => console.log(err));
    } else {
      this.storage.get('id').then(val => {
        this.id = val;
        this.typeOfReq = false;
        this.bSer.stateT(this.id).subscribe(val => this.requests = val, err => console.log(err));
        //this.bSer.state1(this.id).subscribe(val => this.received = val, err => console.log(err));
        //this.bSer.state2(this.id).subscribe(val => this.done = val, err => console.log(err));
        // console.log(this.received);
        // console.log(this.done);
      }).catch(err => console.log(err));
    }
  }

  elocs(eloc) {
    this.http.get(`https://03af7f6c.ngrok.io/api/center/bloodBank/${eloc}`).subscribe(data => {
      this.navCtrl.push(RequestInfoPage, { data: data, type: false });
    }, err => console.log(err));
  }
  receiver(id) {
    this.http.get(`https://03af7f6c.ngrok.io/api/user/${id}`).subscribe(data => {
      console.log(data);
      this.navCtrl.push(RequestInfoPage, { data: data, type: true });
    }, err => console.log(err));
  }

  accept(id) {
    this.http.get(`https://03af7f6c.ngrok.io/api/request/accept/${id}`).subscribe(data => this.req("received"), err => console.log(err));
  }
  rejecet(id) {
    this.http.get(`https://03af7f6c.ngrok.io/api/request/reject/${id}`).subscribe(data => this.req("sent"), err => console.log(err));
  }

}
