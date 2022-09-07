import { DataService } from "./../Services/data.service";
import { AuthService } from "./../Services/Login/auth.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
  constructor(
    public router: Router,
    public authService: AuthService,
    public ds: DataService
  ) {
   // console.log(ds.userData.id);
  }

  ngOnInit() {}
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
