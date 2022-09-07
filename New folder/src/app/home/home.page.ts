import { Storage } from '@ionic/storage-angular';
import { DataService } from "./../Services/data.service";
import { Component } from "@angular/core";
import { from } from "rxjs";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AuthService } from "../Services/Login/auth.service";
import { Platform,MenuController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";



@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  subscription;
  loader_visible: boolean = false;
  fill_all: boolean = false;
  constructor(
    public router: Router,
    public as: AuthService,
    public plt: Platform,
    public ds: DataService,
    public st: Storage,
    public http: HttpClient,
    public menuCtrl: MenuController,

  ) {
    this.subscription = this.plt.backButton.subscribeWithPriority(-1, () => {
      // tslint:disable-next-line: triple-equals
      if (window.location.pathname == '/home') {
        navigator["app"].exitApp();
      } else {
        return;
      }
    });
  }

  

  ngOnInit() {
    this.loader_visible = false;
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);

    this.loader_visible = false;
    this.subscription = this.plt.backButton.subscribeWithPriority(-1, () => {
      // tslint:disable-next-line: triple-equals
      if (window.location.pathname == '/home') {
        navigator["app"].exitApp();
      } else {
        return;
      }
    });
  }

  onSubmit(f: NgForm) {
    f.value.mob == null || f.value.mob.toString().length != 10 || f.value.pass.length < 1 ? this.fill_all = true : this.fill_all = false;
    if (f.value.mob != null && f.value.pass != null && f.value.mob.toString().length == 10 && f.value.pass) {
      this.loader_visible = true;
      this.http
        .post(`${this.as.serverUrl}login_api`, { mob: f.value.mob, pass: f.value.pass })
        .subscribe((data) => {
          this.loader_visible = false;
          if (data != "error") {
            this.ds.isUserPresent = true;
            window.localStorage.setItem("user_data", JSON.stringify(data));
            this.st
              .set("user_data", data)
              .then((user) => {
                this.router.navigate(["frontpage"]);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            this.ds.isUserPresent = false;
            document.getElementById("snackbar_error").textContent = "Please enter valid mobile number and password.";

            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);

          }
        });
    }
    else {
      this.loader_visible = false;
      document.getElementById("snackbar_error").textContent = "Please fill mobile number and password.";
      var x = document.getElementById("snackbar");
      x.className = "show";
      setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);

    }
  }

  
}
