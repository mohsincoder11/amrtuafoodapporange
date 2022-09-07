import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { DataService } from "./../data.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // serverUrl = `https://webmediaindia.co.in/amruta_map_demo/api/`;
  // serverImage = `https://webmediaindia.co.in/amruta_map_demo/public/images/itemimage`;
  //  serverUrl = `http://localhost/amruta/api/`;
  //  serverImage = `http://localhost/amruta/public/images/itemimage`;

  serverUrl = `https://amrutahatcheries.com/amruta_panel/amruta/api/`;
  serverImage = `https://amrutahatcheries.com/amruta_panel/amruta/public/images/itemimage`;

  authState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    public st: Storage,
    public http: HttpClient,
    public ds: DataService,
    public alertCtrl: AlertController,
    public router: Router
  ) {}

  isLogin() {
    this.st
      .get("user_data")
      .then((user) => {
        if (user) {
          this.ds.isUserPresent = true;
          this.router.navigateByUrl("frontpage");
        } else {
          this.ds.isUserPresent = false;
          this.router.navigateByUrl("home");
        }
      })
      .catch((err) => console.log(err));
  }

  logOut() {
    this.st.remove("user_data").then(() => {
      this.ds.isUserPresent = false;
      this.router.navigateByUrl("home");
    });
  }

  login(mobile, password) {
    // console.log(mobile)
    // console.log(password);

    this.http
      .post(`${this.serverUrl}login_api`, { mob: mobile, pass: password })
      .subscribe((data) => {
        console.log(data);
        if (data != "error") {
          this.ds.isUserPresent = true;
          window.localStorage.setItem("user_data", JSON.stringify(data));
          this.st
            .set("user_data", data)
            .then((user) => {
              console.log(user);
              this.router.navigate(["frontpage"]);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.ds.isUserPresent = false;
          document.getElementById("snackbar_error").textContent="Invalid mobile number or password.";

          var x = document.getElementById("snackbar");
          x.className = "show";
          setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
       
        }
      });
  }
}
