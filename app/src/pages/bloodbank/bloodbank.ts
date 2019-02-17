import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Modal, ModalController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { mmi } from 'mapmyindia-map-cordova-ionic-beta';
import { MapServiceProvider } from '../../providers/map-service/map-service';
import { CenterInfoPage } from '../center-info/center-info';


//declare var map;
/**
 * Generated class for the BloodbankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bloodbank',
  templateUrl: 'bloodbank.html',
})
export class BloodbankPage {

  lat: any;
  lng: any;
  load_maps: any;


  constructor(private geolocation: Geolocation, private maps: mmi, private bSer: MapServiceProvider, private modalCtrl: ModalController) {
    var self = this;
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      self.lat = resp.coords.latitude;
      self.lng = resp.coords.longitude;
      self.load_maps = this.maps.loadMaps('map', { key: '36u7ovnrduoesjroud7sub5vtcjquqjw', center: [this.lat, this.lng], zoom: { zoom: 12, control: true }, location: { control: true, initial: true, bounds: true } });

      //Getting All the nearby Blood Banks
      this.bSer.getBloodBanks(self.lat, self.lng).subscribe(data => {
        data.forEach((res) => {
          //Setting each Markers on the Map
          var marker = self.maps.L.marker([res.lat, res.lng]).addTo(this.load_maps);
          marker.bindTooltip(`${res.placeName} ${res.placeAddress} **CLICK TO VIEW PROFILE**"`);
          marker.on('click', function(e) {
            // Opening Modal with INformation about the Center clicked
            let profileModal: Modal = self.modalCtrl.create(CenterInfoPage, { data: res });
            profileModal.present();
            var polyline;

            profileModal.onDidDismiss((data) => {
              if (data.route) {
                //Getting Route
                if (polyline) polyline.remove();

                self.bSer.getRoute(data.profile.lat, data.profile.lng, self.lat, self.lng).subscribe((route) => {
                  polyline = self.maps.L.polyline(route, { color: 'red' }).addTo(self.load_maps);
                  self.load_maps.fitBounds(polyline.getBounds());
                  // polyline.remove();
                }, err => {
                  console.log(err);
                });
              }

            });

          });

        });
      }, err => console.log(err));

    }).catch(err => console.log(err));

  }
}
