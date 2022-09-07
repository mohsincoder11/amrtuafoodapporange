import { DataService } from "./../Services/data.service";
import { HttpClient } from "@angular/common/http";
import { ModalController } from "@ionic/angular";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-odrcandel-reson",
  templateUrl: "./odrcandel-reson.page.html",
  styleUrls: ["./odrcandel-reson.page.scss"],
})
export class OdrcandelResonPage implements OnInit {
  @Input() user_id: string;
  @Input() order_id: string;
  reason;
  public reasons = [
    { id: 1, val: "Product is not required any more", isChecked: true },
    { id: 2, val: "Order place by mistake", isChecked: false },
    {
      id: 4,
      val: "Cheaper alternative available for lesser price.",
      isChecked: false,
    },
  ];
  userStatus = false;

  constructor(
    public modal: ModalController,
    public http: HttpClient,
    public ds: DataService
  ) {}

  ngOnInit() {
   // console.log(this.user_id);
    //console.log(this.order_id);
    this.reason = this.reasons[0].val;
    //console.log(this.reason);
  }

  dismiss() {
    this.modal.dismiss();
  }

  radioChange(ev) {
    //console.log("radioGroupChange", ev.detail);
    this.reason = ev.detail.value;
  }
  async orderCancel() {

    this.ds.startLoading();
    // console.log(this.reason);
    // console.log(this.order_id);
    this.http
      .post(`${this.ds.serverUrl}cancel_app_orders`, {
        cancelid: this.order_id,
        reason: this.reason,
      })
      .subscribe((data) => {
        this.ds.stopLoading();
        // console.log(data);
        if (data == 0) {
          alert("Your order is out for delivery");
        } else {
          document.getElementById("snackbar_error").textContent = "You successfully canceled an order";
          var x = document.getElementById("snackbar");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 3000);
          this.dismiss();
        }
      });
  }
}
