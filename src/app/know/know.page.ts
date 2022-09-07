import { Component, OnInit } from '@angular/core';
import { CallNumber } from "@ionic-native/call-number/ngx";

@Component({
  selector: 'app-know',
  templateUrl: './know.page.html',
  styleUrls: ['./know.page.scss'],
})
export class KnowPage implements OnInit {

  constructor(
    public call: CallNumber
  ) { }

  ngOnInit() {
  }
  makeCall() {
    this.call
      .callNumber("8983399022", true)
      .then((res) => console.log("Launched dialer!", res))
      .catch((e) => {});
  }
 
}
