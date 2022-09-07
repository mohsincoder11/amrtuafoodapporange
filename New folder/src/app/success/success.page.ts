import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-success",
  templateUrl: "./success.page.html",
  styleUrls: ["./success.page.scss"],
})
export class SuccessPage implements OnInit {
  constructor(
    public router: Router, 
    public activatedRoute: ActivatedRoute,
    ) {
  //  console.log(activatedRoute.snapshot.params.amount);
  }
 
  ngOnInit() {}

  goToHome() {
  //  console.log('I got here')
    this.router.navigate(["frontpage"]);
  }


}
