import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
// import { from } from 'rxjs';
import { IonicStorageModule } from '@ionic/storage-angular';
import { File } from "@ionic-native/file/ngx";

import { FilePath } from "@ionic-native/file-path/ngx";
import { Camera } from "@ionic-native/camera/ngx";
import { WebView } from "@ionic-native/ionic-webview/ngx";
import { CodePush } from "@ionic-native/code-push/ngx";
import { IonicSelectableModule } from 'ionic-selectable';
import { CallNumber } from "@ionic-native/call-number/ngx";
import { Geolocation } from '@ionic-native/geolocation/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicSelectableModule,

    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CodePush,
    Geolocation,
    File,
    FilePath,
    Camera,
    WebView,
    CallNumber,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
