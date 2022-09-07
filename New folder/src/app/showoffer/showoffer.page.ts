import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { DataService } from "./../Services/data.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-showoffer',
  templateUrl: './showoffer.page.html',
  styleUrls: ['./showoffer.page.scss'],
})
export class ShowofferPage implements OnInit {

  coupon_data
  selected_coupons;
  Item_value=0;
  constructor(
    public modal:ModalController,
    public ds:DataService,
    public http:HttpClient,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.http.get(`${this.ds.serverUrl}get_coupon_api`).subscribe(
      (data) => {
        this.coupon_data = data;
      },
      (err) => console.log(err)
    );
    this.Item_value=this.ds.modal_pass_item_value;

  }
  apply_coupon(id)
  {

    this.selected_coupons = this.coupon_data.find(obj => {
      return obj.id === id
    });    

    this.modal.dismiss(
      {
        selected_coupon:this.selected_coupons,
      }
    );
  }

  dismiss() {
    this.modal.dismiss(
      {
        formdata: null,
      }
    );
  }
}
