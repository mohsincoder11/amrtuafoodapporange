import { DataService } from "./../Services/data.service";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-changemob",
  templateUrl: "./changemob.page.html",
  styleUrls: ["./changemob.page.scss"],
})
export class ChangemobPage implements OnInit {
  btnView = false;
  pass = "";
  confirmPass = "";
  mob;
  constructor(
    public router: Router,
    public http: HttpClient,
    public ds: DataService,
    public activatedRoute: ActivatedRoute
  ) {
    this.mob = activatedRoute.snapshot.params.mob;
    ////console.log(this.mob);
  }

  ngOnInit() {}

  confirmPassword(pas) {
    this.confirmPass = pas;
    if (this.pass == this.confirmPass) {
      this.btnView = true;
    } else {
      this.btnView = false;
    }
  }

  changePassword() {
    //console.log("password hanged");
    if (this.btnView) {
      //console.log(this.mob + '' + this.pass);

      this.http
        .get(
          `${this.ds.serverUrl}update_password_api?mob=${this.mob}&pass=${this.pass}`
        )
        .subscribe((data) => {
          document.getElementById("snackbar_error").textContent="Password changed successfully.";
          var x = document.getElementById("snackbar");
          x.className = "show";
          setTimeout(function(){ x.className = x.className.replace("show", ""); 
        }, 3000);   
          if (data == "success") {
            this.router.navigate(["settings"]);
          } else {
            alert("Please try again");
          }
        });
    } else {
      // //console.log("pass not correct");
      document.getElementById("snackbar_error").textContent="Password and Confirm Password must be same.";
          var x = document.getElementById("snackbar");
          x.className = "show";
          setTimeout(function(){ x.className = x.className.replace("show", ""); 
        }, 3000);
    }
    // this.router.navigate(["home"]);
  }
}