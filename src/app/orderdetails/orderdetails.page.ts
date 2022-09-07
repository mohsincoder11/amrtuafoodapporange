import { DataService } from "./../Services/data.service";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, NavController } from "@ionic/angular";
import { AuthService } from "../Services/Login/auth.service";
declare var RazorpayCheckout: any;
@Component({
  selector: "app-orderdetails",
  templateUrl: "./orderdetails.page.html",
  styleUrls: ["./orderdetails.page.scss"],
})
export class OrderdetailsPage implements OnInit {
  orderDetails: any = [];
  totalAmount: number = 0;
  evDes: any;
  order: any;
  credit_used;
  credit;
  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    private alertCtrl: AlertController,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public ds: DataService,
    public authS: AuthService
  ) {
    //console.log(activatedRoute.snapshot.params.id);
    activatedRoute.queryParams.subscribe((params) => {
      if (router.getCurrentNavigation().extras.state.orderDetails) {
        this.evDes = router.getCurrentNavigation().extras.state.orderDetails;
        console.log(this.evDes);

      } else {
        //console.log(0);
      }
    });

    this.http
      .get(
        `${this.ds.serverUrl}get_previous_order_list2?order_id=${activatedRoute.snapshot.params.id}`
      )
      .subscribe((data) => {

        this.orderDetails = data['data'];
        data['credit_used'] ? this.credit_used = data['credit_used'].used_credit : this.credit_used = 0;
        data['credit_used'] ? this.credit = data['credit_used'].credit : this.credit = 0;
        this.orderDetails.forEach((element) => {
          this.totalAmount += element.rate;
          // console.log(this.totalAmount);
        });
      });
  }

  ngOnInit() { }
  async showInvalidLoginAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",

      message: "Your Order Has Been Cancel..?",
      buttons: [
        {
          text: "Cancel",
          handler: () => {
            this.navCtrl.navigateForward("orderd");
          },
        },
        {
          text: "Ok",
          handler: () => {
            this.navCtrl.navigateForward("home");
          },
        },
      ],
    });
    await alert.present();
  }

  payOnline() {
    const razorPayOptions = {
      key: "rzp_live_g1Sll3odWJSXzp",
      amount: "",
      currency: "INR",
      name: "Amruta's Chicken",
      description: "",
      image: "https://amrutahatcheries.com/amruta_panel/amruta/public/logo/avatar.jpg",
      payment_capture: "1",
      order_ID: "",
      prefill: {
        email: `${this.ds.userData.email}`,
        contact: `${this.ds.userData.mob}`,
        name: "Amruta's Chicken",
      },
      theme: {
        color: "#F37254",
      },
      modal: {
        ondismiss: function () {
          alert("dismissed");
        },
      },
    };

    //  on successful payment capture
    const successCallback = (paymentId) => {
      // Do what you want to do after payment is done
      this.http
        .post(`${this.ds.serverUrl}pay_online`, {
          id: this.evDes.id,
        })
        .subscribe(
          (data) => {
            // load.dismiss();
            // alert(data);
            this.evDes.mop = "online";
            // console.log(data);
            this.router.navigate([`tabs/tab1`]);
          },
          (err) => {
            // load.dismiss();
            //console.log(err);
          }
        );
    };

    const cancelCallback = function (error) {
      alert("Payment canceled");
    };

    this.http
      .get(`${this.ds.serverUrl}create_order_api?amount=${this.evDes.amount}`)
      .subscribe(async (res) => {
        // console.log(res);
        this.order = await res;
        razorPayOptions.order_ID = await this.order;
        // console.log(razorPayOptions);

        RazorpayCheckout.open(razorPayOptions, successCallback, cancelCallback);
      });
  }

  categories() {
    this.navCtrl.navigateForward("categories");
  }

  register() {
    this.navCtrl.navigateForward("register");
  }
  congrats() {
    this.navCtrl.navigateForward("congrats");
  }

  goToHome() {
    this.router.navigate(["frontpage"]);
  }
  goToProfile() {
    this.router.navigate([`profile`]);
  }

  settings() {
    this.router.navigate([`settings`]);
  }

  track_order() {
    this.router.navigate(['track-order/' + this.activatedRoute.snapshot.params.id]);
  }

  repeat_order() {
   // console.log(this.activatedRoute.snapshot.params.id);
    this.http
      .get(
        `${this.ds.serverUrl}add_repeat_order?order_id=${this.activatedRoute.snapshot.params.id}`
      ).subscribe((data) => {
      //  console.log(data);
        this.router.navigate(['cart/' + this.ds.userData.id]);
      });
  }
}
