import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { DataService } from "./../Services/data.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-forgetpass",
  templateUrl: "./forgetpass.page.html",
  styleUrls: ["./forgetpass.page.scss"],
})
export class ForgetpassPage implements OnInit {
  btnView = false;
  mobileNo;
  mobile_no:boolean=false;
  mobile_no_not_register:boolean=false;  
  loader_visible:boolean=false;
  
  constructor(
    public router: Router,
    public ds: DataService,
    public http: HttpClient
  ) {}

  ngOnInit() {}

  checkMob(mobNo) {
    if (mobNo.toString().length == 10) {
      this.mobile_no=false;  
      this.loader_visible=true;   

      this.http
        .post(`${this.ds.serverUrl}check_mobile_no`, { mob: mobNo })
        .subscribe(
          (res) => {
            this.loader_visible=false;   
            if (res=='0') {
              this.mobile_no_not_register=true;        
              
            } else {
              this.mobile_no_not_register=false;          

              this.mobileNo = mobNo;
              this.btnView = true;
            }
          },
          (err) => console.log(err)
        );
    } else {
      
      this.loader_visible=false;   
      this.mobile_no_not_register=false;    
      this.mobile_no=true;
      this.btnView = false;
    }
  }

  otpPage(f: NgForm) {
    if(f.value.mobile_no.toString().length < 10)
    {
      this.mobile_no=true;
    }
    else{
          this.router.navigate([`verifyotp/${this.mobileNo}`]);
    }
    

  }
}
