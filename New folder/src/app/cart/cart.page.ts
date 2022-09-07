import { PaymentModePage } from "./../payment-mode/payment-mode.page";
import { AuthService } from "./../Services/Login/auth.service";
import { DataService } from "./../Services/data.service";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
} from "@ionic/angular";
declare var RazorpayCheckout: any;
declare var $: any;

import { ShowofferPage } from "../showoffer/showoffer.page";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.page.html",
  styleUrls: ["./cart.page.scss"],
})
export class CartPage implements OnInit {
  cartItems: any = [];
  x;
  newWeight: number;
  originalW: number;
  address = "";
  userDetails;
  total;
  delivery_charge = 10;
  cal_amount;
  cust_name = "";
  cust_mob = "";
  cust_address = "";
  credit: number;

  finalAmount: number = 0;
  temp: number = 0;
  product: any = [];

  timeSlot: any = [];
  details='NA'
  area_id;

  d = new Date();
  day;
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  dayName = "";

  selectTime = "";

  spinnerStatus = false;

  openStatus = false;
  order;
  mop;
  time_select: boolean = false;
  selected_coupon;
  wallet_amount: number;
  usable_wallet_amount = 0;
  final_and_delivery = 10;
  wallet_boolean_Val: boolean = false;
  lat_lan;
  loader_visible: boolean = true;

  constructor(
    public nav: NavController,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public ds: DataService,
    public modalCtrl: ModalController,
    public authS: AuthService,
    public loadingCtrl: LoadingController,
    public altCtrl: AlertController
  ) {
    this.loader_visible = true;

    this.mop = "cod";
    // console.log(activatedRoute.snapshot.params.id);
    this.day = this.d.getDay();
    this.dayName = this.days[this.d.getDay()];
    // console.log(this.dayName);

    http
      .post(`${ds.serverUrl}view_cart2`, {
        user_id: activatedRoute.snapshot.params.id,
      })
      .subscribe((data) => {
        this.cartItems = data['cart_item'];
        this.wallet_amount = data['wallet_credit'] ? data['wallet_credit'] : 0;
        //  console.log(this.wallet_amount);
        let temp;
        if (this.cartItems.length != 0) {
          this.cartItems.forEach((element) => {
            let t = parseFloat(element.weight);
            element.weight = Math.round((t + Number.EPSILON) * 100) / 100;
            element.newW = element.weight;
            element.originalAmount = element.rate / t;

            this.finalAmount += Number(element.rate);
          });
          this.final_and_delivery += this.finalAmount;
          this.final_and_delivery >= this.wallet_amount ? this.usable_wallet_amount = this.wallet_amount : this.usable_wallet_amount = this.final_and_delivery;

          // console.log(this.cartItems);
        } 
       this.loader_visible=false;
      });

    // this.http.get(`${ds.serverUrl}get_area_api`).subscribe(
    //   (data) => {
    //     this.product = data;
    //     // console.log(data);
    //   },
    //   (err) => console.log(err)
    // );

    this.http.get(`${ds.serverUrl}get_time_slot?day=${this.dayName}`).subscribe(
      (data) => {
        this.timeSlot = data;

        if (this.timeSlot.length == 0) {
          //  console.log("we are Close today");
          this.openStatus = false;
        } else {
          this.selectTime = this.timeSlot[0].time;

          this.openStatus = true;

          this.timeSlot = data;
          // console.log(this.timeSlot);
        }

      },
      (err) => console.log(err)
    );

    this.userDetails = ds.userData;
    this.area_id = ds.userData.area_id;

  }

  ionViewDidEnter() { 
       this.loader_visible = true;
    this.address = this.ds.user_map_address;
    this.lat_lan=this.ds.user_map_lat + ',' + this.ds.user_map_lan;
    setTimeout(() => {
    this.loader_visible = false;
    },1200)
   

  }

  ngOnInit() {
    this.cust_name = this.ds.userData.full_name;
    this.cust_mob = this.ds.userData.mob;
    this.area_id = this.ds.userData.area_id;
  }

  async alertPresent() {
    const alt = this.altCtrl.create({
      cssClass: "warning",
      mode: "ios",
      header: "Alert",
      message: `<b>We are closed for the moment, you can place order after some time.</b>`,
      buttons: ["OK"],
    });
    await (await alt).present();
  }

  selectArea() {
    // console.log(this.area_id);
  }
  selectTimeSlot() {
    //console.log(this.selectTime);
  }

  update(i) {
    this.loader_visible=true;

    this.temp = this.finalAmount;
    // console.log("before update: ", this.temp);
    this.cartItems[i].weight = this.cartItems[i].newW;

    this.temp -= this.cartItems[i].rate;
    //console.log("remove from final amount: ", this.temp);

    // console.log(this.finalAmount);

    this.cartItems[i].rate =
      this.cartItems[i].originalAmount * this.cartItems[i].newW;
    // $("#change_rate"+id).text( this.cal_amount);

    this.http
      .post(`${this.ds.serverUrl}update_item_of_cart`, {
        item_id: this.cartItems[i].id,
        weight: this.cartItems[i].weight,
        rate: this.cartItems[i].rate,
      })
      .subscribe((data) => {
        this.loader_visible=false;

        this.temp += Number(this.cartItems[i].rate);
        this.finalAmount = this.temp;
        // console.log("after update: ", this.finalAmount);
        //  console.log(data);
      });
  }

  remove(i) {
    this.loader_visible=true;

    this.remove_coupon();
    let id = this.cartItems[i].id;

    this.http
      .post(`${this.ds.serverUrl}remove_item_from_cart`, {
        item_id: id,
      })
      .subscribe((data) => {
        this.loader_visible=false;

        this.finalAmount = 0;
        this.cartItems.forEach((element) => {
          this.finalAmount += Number(element.rate);
        });
        this.final_and_delivery = Number(this.finalAmount) + 10;
        // console.log(data);
        // console.log(this.cartItems);
      });
    this.cartItems.splice(i, 1);

  }

  select() { }

  // updateAmount(w, i, id) {
  //   //
  //   // let amt = Math.round((w + Number.EPSILON) * 100) / 100
  //   //  w = Math.round((w + Number.EPSILON) * 100) / 100;
  //   // console.log(typeof(w));
  //   if (w == 0 || w == null) {
  //     // console.log("empty values");
  //     return;
  //   } else {
  //     // console.log(amt);
  //     this.cartItems[i].newW = w;
  //     this.temp = Number(this.finalAmount);
  //     // console.log("before update: ", this.cartItems[i].newW);
  //     this.cartItems[i].weight = w;

  //     this.temp -= this.cartItems[i].rate;
  //     // console.log("remove from final amount: ", this.temp);

  //     // console.log(this.finalAmount);
  //     let t: number = this.cartItems[i].originalAmount * w;
  //     //this.cartItems[i].rate = Math.round(t);
  //     $("#change_rate" + id).text(Math.round(t));

  //     //  console.log(this.finalAmount);
  //     // this.finalAmount=0;
  //     //   $.each( this.cartItems, function(a,b) {             
  //     //     this.finalAmount+=parseInt((Math.round(b.newW * b.originalAmount))) ;
  //     //     console.log(Math.round(b.newW * b.originalAmount));
  //     //     console.log(this.finalAmount);
  //     // }); 
  //     this.finalAmount = 0;
  //     this.cartItems.forEach((element) => {
  //       let t = parseFloat(element.weight);

  //       this.finalAmount += Math.round(element.newW * element.originalAmount);
  //     });
  //     this.temp += Number(this.cartItems[i].rate);


  //     // console.log("after update: ", this.finalAmount);
  //     // console.log(this.cartItems[i]);

  //     // this.http
  //     //   .post(`${this.ds.serverUrl}update_item_of_cart`, {
  //     //     item_id: this.cartItems[i].id,
  //     //     weight: this.cartItems[i].weight,
  //     //     rate: this.cartItems[i].rate,
  //     //   })
  //     //   .subscribe((data) => {
  //     //     // console.log("after update: ", this.finalAmount);
  //     //     console.log(data);
  //     //   });
  //   }
  // }

  placeOrder() {
    if (this.openStatus) {
      if (this.selectTime == "") {
        this.time_select = true;
        return;
      }

      if (!this.ds.order_shop_id) {
        alert("Please select your delivery address");
        return;
      }

      if (this.selectTime != "") {
        if (this.mop == "online") {
          this.checkout();
          //  console.log("online choose");
          return;
        }

        // all things are fill but payment mode is Cash On Delivery
        if (this.mop == "cod") {

          this.time_select = false;

          this.loader_visible=true;
          this.final_and_delivery = this.final_and_delivery;
          this.usable_wallet_amount = this.wallet_boolean_Val ? this.usable_wallet_amount : 0;

          this.http
            .post(`${this.ds.serverUrl}place_order3`, {
              cust_name: this.cust_name,
              user_id: this.userDetails.id,
              mobile: this.cust_mob,
              amount: this.final_and_delivery,
              address: this.address,
              lat_lan: this.lat_lan,
              shop_id: this.ds.order_shop_id,
              time_slot: this.selectTime,
              mop: this.mop,
              paidstatus: "0",
              collectedcash: "0",
              credit: this.credit,
              details:this.details,
              usable_wallet_amount: this.usable_wallet_amount,

            })
            .subscribe(
              (data) => {
                this.selected_coupon=null;
                this.loader_visible=false;

                if (data != 0) {
                  this.router.navigate([`success/${this.final_and_delivery}`]);
                }
                else {
                  alert('Something is error.');
                }
              },
              (err) => {
                this.loader_visible=false;
                //console.log(err);
              }
            );

          return;
        }
      } else {
      }
    } else {
      alert("We are close this time. Please come back later to place order.");
    }
  }

  async checkout() {
    this.startLoading();
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
      this.startLoading();

      this.http
        .post(`${this.ds.serverUrl}place_order3`, {
          cust_name: this.cust_name,
          user_id: this.userDetails.id,
          mobile: this.cust_mob,
          amount: this.final_and_delivery,
          address: this.address,
          lat_lan: this.lat_lan,
          shop_id: this.ds.order_shop_id,
          time_slot: this.selectTime,
          mop: 'Online',
          paidstatus: "1",
          collectedcash: this.final_and_delivery,
          credit: this.credit,
          details:this.details,
          usable_wallet_amount: this.usable_wallet_amount,

          
        })
        .subscribe(
          (data) => {
            this.selected_coupon=null;

           // //this.loadingCtrl.dismiss();
    this.loader_visible = false;
            this.router.navigate([`success/${this.final_and_delivery}`]);
          },
          (err) => {
          //  //this.loadingCtrl.dismiss();
    this.loader_visible = false;

            // load.dismiss();
            console.log(err);
          }
        );
    };

    const cancelCallback = function (error) {
      //this.loadingCtrl.dismiss();
    this.loader_visible = false;
      alert("Payment canceled");
    };

    // creating order
    this.http
      .get(`${this.ds.serverUrl}create_order_api?amount=${this.final_and_delivery}`)
      .subscribe(async (res) => {
        //this.loadingCtrl.dismiss();
    this.loader_visible = false;
        this.order = await res;
        razorPayOptions.order_ID = await this.order;
        console.log(razorPayOptions);
        RazorpayCheckout.on('payment.success', successCallback);
        RazorpayCheckout.on('payment.cancel', cancelCallback);
        RazorpayCheckout.open(razorPayOptions);
      });
  }

  async selectPaymentMod() {
    if (this.openStatus) {   
    
      if ((this.finalAmount+Number(10)) < 100) {
        alert("Amount should be greater than 100.");
        return;
      }

      // if time is not selected
      if (this.selectTime == "") {
        this.time_select = true;
        return;
      }
      // if address is not entered
      if (this.address == null) {
        alert("Please enter address details ");
        return;
      }

      // return;
      this.time_select = false;

      const modal = await this.modalCtrl.create({
        component: PaymentModePage,
        cssClass: "paymentmode",
        mode: "ios",
        componentProps: {
          mop: this.mop,
        },
      });
      await modal.present();
      await modal.onDidDismiss().then(async (data) => {
        console.log(data);
        if ((this.finalAmount+Number(10)) < 100) {
          alert("Amount should be greater than 100.");
          return;
        }
  
        if (data.data != undefined) {
          this.mop = await data.data.paymentMode;

          this.placeOrder();
        } else console.log(data.role);
      });
    } else {
      alert("We are close this time. Please come back later to place order.");
    }
  }

  async startLoading() {
    const load = await this.loadingCtrl.create({
      mode: "ios",
      message: "Please wait...",
      cssClass: "my-custom-class",
    });
    await load.present();
  }

  

  slot() {
    this.nav.navigateForward("slot");
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

  async show_offers() {
    this.ds.modal_pass_item_value = this.final_and_delivery;
    const modal = await this.modalCtrl.create({
      component: ShowofferPage,
      cssClass: "ShowofferPage_modal"
    });
    await modal.present();
    await modal.onDidDismiss().then(async (data) => {
      this.selected_coupon = data.data.selected_coupon;
      this.credit = Math.round((Number(this.final_and_delivery) / 100) * Number(this.selected_coupon.discount_percent));
      this.credit > this.selected_coupon.max_discount ? this.credit = this.selected_coupon.max_discount : '';
      console.log(this.credit);
    });
  }

  remove_coupon() {
    this.selected_coupon = null;
    this.credit = 0;
  }

  use_wallet_amount(values) {
    this.wallet_boolean_Val = !this.wallet_boolean_Val;
    if (this.wallet_boolean_Val) {
      this.final_and_delivery -= Number(this.usable_wallet_amount);
    }
    else {
      this.final_and_delivery += Number(this.usable_wallet_amount);
    }
  }

  show_map() {
    this.router.navigate([`show-map`]);

  }

}
