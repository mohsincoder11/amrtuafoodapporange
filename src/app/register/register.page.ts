import { DataService } from "./../Services/data.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { NavController } from "@ionic/angular";
import { AuthService } from "../Services/Login/auth.service";
import { Storage } from '@ionic/storage-angular';
import { User } from "./User";
import { NavigationExtras, Router } from "@angular/router";
import { IonicSelectableComponent } from 'ionic-selectable';
@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})

export class RegisterPage implements OnInit {
  full_name: string;
  email: string;
  mob: string;
  pass: string;
  address: string;
  product;
  loader_visible = false;
  check_valid_details: boolean = false;
  area_id;
  data: Object;
  ports;
  mobCheck = true;
  constructor(
    public nav: NavController,
    public http: HttpClient,
    public ds: DataService,
    public st: Storage,
    public as: AuthService,
    public router: Router
  ) {
    this.ports = [
      { id: 1, name: 'Tokai' },
      { id: 2, name: 'Vladivostok' },
      { id: 3, name: 'Navlakhi' }
    ];
    this.http.get(`${ds.serverUrl}get_area_api`).subscribe(
      (data) => {
        this.product = data;
      },
      (err) => console.log(err)
    );
  }

  sendDataToServer(formValue: NgForm) {
    if (this.mobCheck) {
      if (formValue.value.full_name  && formValue.value.mob.toString().length == 10  && formValue.value.pass && this.validateEmail(formValue.value.email)) {

        this.check_valid_details = false;
        let dataToSend = {
          full_name: formValue.value.full_name,
          email: formValue.value.email,
          mob: formValue.value.mob,
          pass: formValue.value.pass,
      //    area_id: formValue.value.area_id.id,
          image: "noimage.png",
        };
        let navExtra: NavigationExtras = {
          state: {
            regData: dataToSend,
          },
        };
        this.router.navigate(["verifyuser"], navExtra);
      } else {
        this.check_valid_details = true;
      }
    } else {
      alert("This mobile number is already registered with us.");
    }
  }

   validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
  ngOnInit() { }

  checkMob(ev) {
    const value = ev;
    if (value.length == 10) {
      this.loader_visible = true;
      console.log(value);
      this.http
        .post(`${this.ds.serverUrl}check_mobile_no`, { mob: value })
        .subscribe(
          (res) => {
            this.loader_visible = false;

            if (res == 1) {
              console.log(res);
              this.mobCheck = false;
              alert("Mobile number  already exists");
            } else {
              this.mobCheck = true;
              // console.log(res);
            }
          },
          (err) => console.log(err)
        );
    } else {
      //console.log("do nothing");
    }
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }

  selectArea() {
    //console.log(this.area_id);
  }

  login() {
    this.router.navigate(["home"]);
  }
}
