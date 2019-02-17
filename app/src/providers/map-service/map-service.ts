import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MapServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MapServiceProvider {
  url: string = 'https://03af7f6c.ngrok.io/api/center/all/bloodBank';
  constructor(public http: HttpClient) {
  }
  getBloodBanks(lat, lng) {
    return this.http.post(this.url, { "lat": lat, "lng": lng }, { headers: { 'Content-Type': 'application/json' } })
  }
  getHospitals(lat, lng) {
    return this.http.post('https://03af7f6c.ngrok.io/api/center/all/hospital', { "lat": lat, "lng": lng }, { headers: { 'Content-Type': 'application/json' } })
  }
  getUsers(lat, lng) {
    return this.http.post('https://03af7f6c.ngrok.io/api/user/all', { "lat": lat, "lng": lng }, { headers: { 'Content-Type': 'application/json' } })
  }
  getRoute(lat1, lng1, lat2, lng2) {
    return this.http.get(`https://03af7f6c.ngrok.io/api/center/findDist/${lat1}/${lng1}/${lat2}/${lng2}`)
  }
  stateZ(id) {
    return this.http.get(`https://03af7f6c.ngrok.io/api/request/user/sent/${id}`);
  }
  stateO(id) {
    return this.http.get(`https://03af7f6c.ngrok.io/api/request/user/received/${id}`);
  }
  stateT(id) {
    return this.http.get(`https://03af7f6c.ngrok.io/api/request/user/done/${id}`);
  }

}
