import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginServiceProvider {


  constructor(public http: HttpClient) {
    console.log('Hello LoginServiceProvider Provider');
  }
  loginAsUser(email: string, password: string) {
    var url = 'https://03af7f6c.ngrok.io/api/user/login'

    return this.http.post(url, { email: email, password: password })
  }
  loginAsCenter(email: string, password: string) {
    var url = 'https://03af7f6c.ngrok.io/api/center/login'

    return this.http.post(url, { email: email, password: password })
  }
}
