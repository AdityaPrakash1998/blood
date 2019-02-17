import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { BloodbankPage } from '../pages/bloodbank/bloodbank';
import { HospitalPage } from '../pages/hospital/hospital';
import { CenterInfoPage } from '../pages/center-info/center-info';
import { HospitalInfoPage } from '../pages/hospital-info/hospital-info';
import { UserInfoPage } from '../pages/user-info/user-info';
import { CenterPage } from '../pages/center/center';
import { RequestInfoPage } from '../pages/request-info/request-info';



import { Geolocation } from '@ionic-native/geolocation';
import { mmi } from 'mapmyindia-map-cordova-ionic-beta';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { MapServiceProvider } from '../providers/map-service/map-service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage, BloodbankPage, CenterInfoPage, HospitalInfoPage, HospitalPage, UserInfoPage, RequestInfoPage, CenterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage, BloodbankPage, CenterInfoPage, HospitalInfoPage, HospitalPage, UserInfoPage, RequestInfoPage, CenterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoginServiceProvider,
    MapServiceProvider,
    MapServiceProvider, mmi, Geolocation, LocalNotifications
  ]
})
export class AppModule { }
