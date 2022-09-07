import { DataService } from "./../Services/data.service";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-get-otp",
  templateUrl: "./get-otp.page.html",
  styleUrls: ["./get-otp.page.scss"],
})
export class GetOTPPage implements OnInit {
  storeOtp: any;
  btnView = false;
  otp;
  mob;
  hideResendBtn = true;

  t1: string;
  t2: string;
  t3: string;
  t4: string;
  t5: string;
  t6: string;
  
  otp_error:boolean=false;
  loader_visibility:boolean=false;
  time;
  resend_click: boolean = false;
  constructor(
    public router: Router,
    public http: HttpClient,
    public ds: DataService,
    public activatedRoute: ActivatedRoute
  ) {
    //console.log(activatedRoute.snapshot.params.mob);
    this.mob = activatedRoute.snapshot.params.mob;
    this.resend_otp();
  }

  ngOnInit() {}

 
  resend_otp() {
    this.starttimer();
    this.loader_visibility = true;
    this.http
    .get(`${this.ds.serverUrl}forgot_password_otp?mob=${this.mob}`)
    .subscribe(
        (res) => {
          this.storeOtp = res;
          this.loader_visibility = false;
        },
        (err) => {
          this.loader_visibility = false;
        }
      );
  }
  starttimer() {
    this.time = '59';
    var a = setInterval(() => {
      if (this.time > 0)
        this.time = String(this.time - 1).padStart(2, "0");
      else {
        this.resend_click = true;
        clearInterval(a);
      }
    }, 1000)
  }
  // get each otp
  moveFocus(event, nextElement, previousElement) {
    if (event.keyCode === 8 && previousElement) {
      previousElement.setFocus();
    } else if (event.keyCode >= 48 && event.keyCode <= 57) {
      if (nextElement) {
        nextElement.setFocus();
      }
    } else if (event.keyCode >= 96 && event.keyCode <= 105) {
      if (nextElement) {
        nextElement.setFocus();
      }
    } else {
      event.path[0].value = "";
    }
  }

 
  checkOTP(OTP) {
    if (OTP.length == 4) {
      this.btnView = true;
      this.otp = OTP;
    } else {
      this.btnView = false;
    }
  }
  clear_field(ev){
    ev.target.value ='';
  }
  verify() {
    if (
      this.t1 == undefined ||
      this.t2 == undefined ||
      this.t3 == undefined ||
      this.t4 == undefined
    ) {
      return;
    }
    this.otp = this.t1.toString()+this.t2.toString()+this.t3.toString()+this.t4.toString();
     console.log(this.otp);
    //console.log(this.storeOtp);

    if (this.otp == this.storeOtp) {
      this.otp_error=false;

      this.router.navigate([`changemob/${this.mob}`]);
      // console.log(true);
    } else {
      this.otp_error=true;
    }
  }
}
