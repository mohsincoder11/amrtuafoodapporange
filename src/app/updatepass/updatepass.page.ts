import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { DataService } from "./../Services/data.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-updatepass",
  templateUrl: "./updatepass.page.html",
  styleUrls: ["./updatepass.page.scss"],
})
export class UpdatepassPage implements OnInit {
  btnView = false;
  mobileNo;
  mobile_no:boolean=false;
  mobile_no_not_register:boolean=false;  
  loader_visible:boolean=false;

  constructor(
    public router: Router,
    public ds: DataService,
    public http: HttpClient
  ) {}

  ngOnInit() {}

  checkMob(ev) {
    let mobNo=ev.target.value;
    if (mobNo.length == 10) {
      this.btnView = true;
      this.mobileNo = mobNo;
    } else {
      this.btnView = false;
    }
  }

  otpPage(f: NgForm) {
    this.loader_visible = true;

    this.http
      .post(`${this.ds.serverUrl}check_mobile_no`, { mob: this.mobileNo })
      .subscribe(
        (res) => {
          this.loader_visible = false;

         // console.log(res);
          if (res != 1) {
            document.getElementById("snackbar_error").textContent = "Please enter registered mobile number.";

            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
            // alert("Mobile number should be unique");
          } else {
           // console.log(res);
            this.router.navigate([`get-otp/${this.mobileNo}`]);
          }
        },
        (err) => {
          this.loader_visible = false;

        }
      );
  }
}
