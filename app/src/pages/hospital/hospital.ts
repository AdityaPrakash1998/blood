import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { mmi } from 'mapmyindia-map-cordova-ionic-beta';
import { MapServiceProvider } from '../../providers/map-service/map-service';
import { HospitalInfoPage } from '../hospital-info/hospital-info';
import { Platform } from 'ionic-angular';
/**
 * Generated class for the HospitalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hospital',
  templateUrl: 'hospital.html',
})
export class HospitalPage {
  lat: any;
  lng: any;
  load_maps: any;

  constructor(private platform: Platform, private geolocation: Geolocation, private maps: mmi, public navCtrl: NavController, public navParams: NavParams, private bSer: MapServiceProvider, private modalCtrl: ModalController) {
    var self = this;
    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        self.lat = resp.coords.latitude;
        self.lng = resp.coords.longitude;
        self.load_maps = this.maps.loadMaps('map', { key: '36u7ovnrduoesjroud7sub5vtcjquqjw', center: [this.lat, this.lng], zoom: { zoom: 13, control: true }, location: { control: true, initial: true, bounds: true } });

        //Getting All the nearby Blood Banks
        this.bSer.getHospitals(resp.coords.latitude, resp.coords.longitude).subscribe(data => {
          data.forEach((res) => {
            //Setting each Markers on the Map
            var marker = self.maps.L.marker([res.latitude, res.longitude]).addTo(this.load_maps);
            marker.bindTooltip(`${res.placeName} ${res.placeAddress} **CLICK TO VIEW PROFILE**"`);
            marker.on('click', function(e) {
              // Opening Modal with INformation about the Center clicked
              let profileModal: Modal = self.modalCtrl.create(HospitalInfoPage, { data: res });
              profileModal.present();
              var polyline;

              profileModal.onDidDismiss((data) => {
                if (data.route) {
                  //Getting Route
                  if (polyline) polyline.remove();
                  setTimeout(() => { }, 2000);
                  self.bSer.getRoute(data.profile.latitude, data.profile.longitude, self.lat, self.lng).subscribe((route) => {
                    polyline = self.maps.L.polyline(route, { color: 'red' }).addTo(self.load_maps);
                    self.load_maps.fitBounds(polyline.getBounds());
                    // polyline.remove();
                  }, err => {
                    console.log(err);
                  })
                } else {//Wants to request the Blood Bank

                }
              });
            });
          });
        }, err => console.log(err));
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HospitalPage');
  }

}
