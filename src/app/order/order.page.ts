import { AuthService } from "./../Services/Login/auth.service";
import { OdrcandelResonPage } from "./../odrcandel-reson/odrcandel-reson.page";
import { NavigationExtras, Router } from "@angular/router";
// import { CancelOrderModalPage } from "./../cancel-order-modal/cancel-order-modal.page";
import { ModalController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { DataService } from "./../Services/data.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-order",
  templateUrl: "./order.page.html",
  styleUrls: ["./order.page.scss"],
})
export class OrderPage implements OnInit {
  orderHistory: any = [];
  temp: any = [];
  userid;
  spinnerStatus = true;

  constructor(
    public ds: DataService,
    public http: HttpClient,
    public modalCtrl: ModalController,
    public router: Router,
    public authS: AuthService
  ) {
    this.userid = ds.userData.id;
    //console.log(ds.userData.id);
    this.http
      .get(`${this.ds.serverUrl}get_previous_order?user_id=${ds.userData.id}`)
      .subscribe((data) => {
        console.log(data);
        this.orderHistory = data;
        if (this.orderHistory.length != 0) {
          this.orderHistory.forEach((element) => {
            element.created_at = element.created_at.split("T")[0];
          });
          this.spinnerStatus = true;
        } else {
          this.spinnerStatus = false;
        }

      });
  }

  ngOnInit() { }

  orderDetails(index) {
    const navE: NavigationExtras = {
      state: {
        orderDetails: this.orderHistory[index],
      },
    };

    this.router.navigate([`orderdetails/${this.orderHistory[index].id}`], navE);
  }

  ionViewWillEnter() {
    //console.log(this.ds.userData.id);
    this.http
      .get(
        `${this.ds.serverUrl}get_previous_order?user_id=${this.ds.userData.id}`
      )
      .subscribe((data) => {
        this.orderHistory = data;
        this.orderHistory.forEach((element) => {
          element.created_at = element.created_at.split("T")[0];
        });

        //console.log(data);
      });
  }


  doRefresh(ev) {
    setTimeout(() => {
      this.http
        .get(
          `${this.ds.serverUrl}get_previous_order?user_id=${this.ds.userData.id}`
        )
        .subscribe((data) => {
          this.orderHistory = data;
          this.orderHistory.forEach((element) => {
            element.created_at = element.created_at.split("T")[0];
          });

          //console.log(data);
        });
      ev.target.complete();

    }, 3000);
  }


  async orderCancel(i) {
    //console.log(this.userid);
    // console.log(this.orderHistory[i].id);

    const modal = await this.modalCtrl.create({
      component: OdrcandelResonPage,
      cssClass: "addressModal",
      componentProps: {
        user_id: this.userid,
        order_id: this.orderHistory[i].id,
      },
    });
    return await modal.present();
  }

  goToHome() {
    this.router.navigate([`frontpage`]);
  }

  goToProfile() {
    this.router.navigate([`profile`]);
  }

  settings() {
    this.router.navigate([`settings`]);
  }

  repeat_order(id) {
  //  console.log(id);
    this.http
      .get(
        `${this.ds.serverUrl}add_repeat_order?order_id=${id}`
      ).subscribe((data) => {
      //  console.log(data);
        this.router.navigate(['cart/'+this.userid]);
      });
  }

}
