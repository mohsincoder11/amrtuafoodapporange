import { ModalController } from "@ionic/angular";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-payment-mode",
  templateUrl: "./payment-mode.page.html",
  styleUrls: ["./payment-mode.page.scss"],
})
export class PaymentModePage implements OnInit {
  // Data passed in by componentProps
  @Input() mop: string;
  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {}

  selectPayMode(ev) {
    this.modalCtrl.dismiss({
      paymentMode: ev.target.value,
    });
  }

  dismiss(mop) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data

    this.modalCtrl.dismiss({
      paymentMode: null,
    });
  }
}
