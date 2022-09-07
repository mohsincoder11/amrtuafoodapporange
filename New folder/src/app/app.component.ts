import { DataService } from "./Services/data.service";
import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthService } from "./Services/Login/auth.service";
import { Storage } from '@ionic/storage-angular';
import { Router } from "@angular/router";
import { CodePush, InstallMode } from "@ionic-native/code-push/ngx";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  navigate: any;
  userData: any;
  imgURl =
  "https://amrutahatcheries.com/amruta_panel/amruta/public/register_user_profile/noimage.png";

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private st: Storage,
    private authService: AuthService,
    public ds: DataService,
    public codePush: CodePush
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.st.create();
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
     this.checkUpdates();

      this.st
        .get("user_data")
        .then((user) => {
          if (user) {
            this.ds.isUserPresent = true;
            this.userData = user;
            this.router.navigateByUrl("frontpage");
          //  console.log("user is login");
          } else {
            this.ds.isUserPresent = false;
            this.router.navigateByUrl("home");
        //    console.log("user is not login");
          }
        })
        .catch((err) => console.log(err));
    });
  }

  get_session_data() {
    this.st
    .get("user_data")
    .then((user) => {
      console.log(user); 
         this.userData = user;
if(this.userData.image!=null){
      this.imgURl = 'https://amrutahatcheries.com/amruta_panel/amruta/public/register_user_profile/'+this.userData.image;
      console.log(this.userData.image);
    }

    })
    
    console.log(this.userData);
    }

  // checkUpdate function will check is there any updates if so display the popup window to update app
  //
  checkUpdates() {
    const downloadProgress = (progress) => {
       console.log(`Downloaded ${progress.receivedBytes} of ${progress.totalBytes}`); 
      }
    this.codePush.sync({}, downloadProgress).subscribe((syncStatus) => console.log(syncStatus));
    
  }


  about() {
    this.router.navigate(["know"]);
  }

  editProfile() {
    this.router.navigate(["profile"]);
  }

  changeMob(){
    this.router.navigate([`updatepass`]);
  }

  orderHistory() {
    this.router.navigate(["order"]);
  }

  cart() {
    this.router.navigate([`cart/${this.ds.userData.id}`]);
  }

  logOut() {
    this.authService.logOut();
  }
}
