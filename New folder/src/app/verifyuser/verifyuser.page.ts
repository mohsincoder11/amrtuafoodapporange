import { AlertController } from "@ionic/angular";
import { DataService } from "./../Services/data.service";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-verifyuser",
  templateUrl: "./verifyuser.page.html",
  styleUrls: ["./verifyuser.page.scss"],
})
export class VerifyuserPage implements OnInit {
  otp;
  storeOtp: any;

  mobile: number;
  status = false;
  validMobile = false;
  hideResendBtn = true;

  regUserData: any;
  btnView = false;
  mob;

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
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public ds: DataService,
    public altCtrl: AlertController
  ) {
    activatedRoute.queryParams.subscribe(async (params) => {
      if (router.getCurrentNavigation().extras.state.regData) {
        this.regUserData = await router.getCurrentNavigation().extras.state
          .regData;
        console.log(this.regUserData);

        this.http
          .get(
            `${this.ds.serverUrl}send_reguser_otp?mob=${this.regUserData.mob}`
          )
          .subscribe((data) => {
            console.log(data);
            this.storeOtp = data;
            console.log(this.regUserData);
          });
      }
    });
  }

  ngOnInit() { }

  resend() {
    this.http
      .get(`${this.ds.serverUrl}send_reguser_otp?mob=${this.regUserData.mob}`)
      .subscribe((data) => {
        this.storeOtp = data;
        console.log(this.storeOtp);
      });
  }

  clear_field(ev){
    ev.target.value ='';
  }

  resendOTP() {
    this.hideResendBtn = false;
    setTimeout(() => {
      this.resend();
      this.hideResendBtn = true;
    }, 20000);
  }

  resend_otp() {
    this.starttimer();
    this.loader_visibility = true;
    this.http
    .get(`${this.ds.serverUrl}send_reguser_otp?mob=${this.regUserData.mob}`)
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


  onKeyUP(event) {
     let ev=event.target.value;
    if (ev.length > 4) {
      this.status = true;
      return;
    }

    if (ev == this.storeOtp) {
      this.status = false;
      this.mobile = ev;
      this.validMobile = true;
      console.log(ev);
      return;
    } else {
      this.validMobile = false;
      return;
    }
  }
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

      this.http
      .post(`${this.ds.serverUrl}register_user_api`, this.regUserData)
      .subscribe((response) => {
        // this.ds.showAlert();
        console.log(response);
        this.accConfirmation();
      });
      // console.log(true);
    } else {
      this.otp_error=true;
    }
  }

 

  async accConfirmation() {
    const alert = await this.altCtrl.create({
      cssClass: "regSuccessAlert",

      message: `<div class="success-checkmark">
            <div class="check-icon">
              <span class="icon-line line-tip"></span>
              <span class="icon-line line-long"></span>
              <div class="icon-circle"></div>
              <div class="icon-fix"></div>
            </div>
          </div>
          <center style="margin-left: -20%">
          <strong style = 'font-size:larger;' >
          Success
          </strong> <br>
          <span style="font-size: small"> 
          Congratulation, your account has been created successfully.
          </span>
          </center>
`,
      mode: "ios",
      animated: true,
      backdropDismiss: false,
      buttons: [
        {
          text: "Continue",
          handler: () => {
            console.log("Confirm Okay");
            this.router.navigate(["home"]);
          },
        },
      ],
    });

    await alert.present();
  }
}
