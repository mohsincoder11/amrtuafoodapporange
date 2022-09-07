import { AuthService } from "./../Services/Login/auth.service";
import { Router } from "@angular/router";
import { ProductService } from "./../Services/Products/product.service";
import { DataService } from "./../Services/data.service";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { CodePush } from "@ionic-native/code-push/ngx";

import {
  IonSlides,
  ModalController,
  NavController,
  Platform,
  MenuController
} from "@ionic/angular";
declare var $: any;


import { Storage } from '@ionic/storage-angular';
@Component({
  selector: "app-frontpage",
  templateUrl: "./frontpage.page.html",
  styleUrls: ["./frontpage.page.scss"],
})
export class FrontpagePage implements OnInit {
  @ViewChild("slides") slide: IonSlides;
  product: any = [];
  offers: any = [];
  public didInit: boolean = false;

  private currentNumber = 0;
  weight: number;
  newWeight: number;
  originalW: number;
  productCount: any = 0;
  cal_amount;
  subscription;

  spinnerStatus = true;

  finalAmount: number = 0;
  originalAmount: number;
  temp: number = 0;
  total;
  userid;
  datatosend;
  slider: any;
  slideOptions11 = {
  initialSlide: 0,
  slidesPerView: 1,
  autoplay: true,

};
  sliderOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 5,
    autoplay: {
      disableOnInteraction: false,
      delay: 3000,
      loop: false

    },
    speed: 2000,
  }
  progress;
  loader_visible: boolean = false;

  constructor(
    public nav: NavController,
    public modalController: ModalController,
    public http: HttpClient,
    public st: Storage,
    public ds: DataService,
    public ps: ProductService,
    public router: Router,
    public plt: Platform,
    public authS: AuthService,
    private platform: Platform,
    private codePush: CodePush,
    public menuCtrl: MenuController,

  ) {



    this.subscription = this.plt.backButton.subscribeWithPriority(-1, () => {
      // tslint:disable-next-line: triple-equals
      if (window.location.pathname == "/frontpage") {
        navigator["app"].exitApp();
      } else {
        return;
      }
    });
    // console.log(window.location.pathname);

    st.get("user_data")
      .then((user) => {
        ds.userData = user;
        this.userid = user.id;
        // console.log(this.userid);
        this.http.get(`${this.ds.serverUrl}get_items_api2`).subscribe(
          (data) => {
            this.product = data['regular_product'];
            // console.log(this.ps.addToCart);
            if (this.product.length != 0) {
              this.product.forEach((items) => {
                items.weight = 1;
                items.originalRate = items.retailrate;
              });
              // console.log(this.product);
            } 
          },
          (err) => console.log(err)
        );

        this.http
          .get(`${this.ds.serverUrl}check_cart_count?user_id=${user.id}`)
          .subscribe(
            (count) => {
              this.productCount = count;
            },
            (err) => console.log(err)
          );
      })

      .catch((err) => {
        console.log(err);
      });
  }


  slidesDidLoad11(slides: IonSlides): void {
    slides.startAutoplay();
  }

  afterslidesLoad() {
    // this.slide.startAutoplay();
  }

  ionViewWillLeave() {
    // this.slide.stopAutoplay();
  }

  ionViewDidEnter() {

    if (this.product.length != 0) {
      // this.slide.startAutoplay();
    }
  }

  sliderTaped() {
    // this.slide.startAutoplay();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);


    this.st
      .get("user_data")
      .then((result) => {
        this.ds.userData = result;
        // this.http.get(this.ds.serverUrl + 'getallpromotion_api').subscribe(res => {
        //   this.offers = res['offers'];
        //   //  console.log(res)
        // })
      })
      .catch((err) => {
        console.log(err);
      });

    //console.log(this.userid);
    this.subscription = this.plt.backButton.subscribeWithPriority(-1, () => {
      // tslint:disable-next-line: triple-equals
      if (window.location.pathname == "/frontpage") {
        navigator["app"].exitApp();
      } else {
        return;
      }
    });
    this.loader_visible=true;

    // getting all products
    this.http.get(`${this.ds.serverUrl}get_items_api2`).subscribe(
      (data) => {
        this.loader_visible=false;

        this.offers = data['offer_product'];

        this.product = data['regular_product'];
        // this.slide.startAutoplay();

        // console.log(this.ps.addToCart);
        if (this.product.length != 0) {
          this.product.forEach((items) => {
            items.weight = 1;
            items.originalRate = items.retailrate;
          });
          // console.log(this.product);
        } 
      },
      (err) => console.log(err)
    );

    // badge count
    this.http
      .get(`${this.ds.serverUrl}check_cart_count?user_id=${this.userid}`)
      .subscribe(
        (count) => {
          this.productCount = count;
          // console.log(this.productCount);
        },
        (err) => console.log(err)
      );
  }

  doRefresh(ev) {
    setTimeout(() => {
      this.loader_visible=true;

      this.http.get(`${this.ds.serverUrl}get_items_api`).subscribe(
        (data) => {
          this.loader_visible=false;

          this.product = data;
          ev.target.complete();
          // console.log("items");
          // console.log(this.ps.addToCart);
          if (this.product.length != 0) {
            this.product.forEach((items) => {
              items.weight = 1;
              items.originalRate = items.retailrate;
            });
            // console.log(this.product);
          } 
        },
        (err) => console.log(err)
      );

      // badge count
      this.http
        .get(`${this.ds.serverUrl}check_cart_count?user_id=${this.userid}`)
        .subscribe(
          (count) => {
            // console.log("count");
            this.productCount = count;
            // console.log(this.productCount);
          },
          (err) => console.log(err)
        );
    }, 2000);
  }

  updateAmount(ev, i, id) {
    let weight = ev.target.value;
    if (weight == 0) {
      return;
    }
    this.newWeight = Math.round((weight + Number.EPSILON) * 100) / 100;
    this.originalAmount = this.product[i].originalRate;
    this.finalAmount = this.originalAmount * weight;
    this.cal_amount =
      Math.round((this.finalAmount + Number.EPSILON) * 100) / 100;
    $("#change_rate" + id).text(Math.round(this.cal_amount));
    this.product[i].weight = weight;
  }

  addToCart(from, index) {
    if (this.product[index].weight != 0) {
      let total = parseFloat(this.cal_amount);

      if (from == 'from_offer') {
        this.datatosend = {
          item_id: this.offers[index].id,
          user_id: this.ds.userData.id,
          item_name: this.offers[index].itemname,
          weight: 1,
          rate: Math.round(1 * this.offers[index].retailrate),
        };
      }
      if (from == 'from_regular') {
        this.datatosend = {
          item_id: this.product[index].id,
          user_id: this.ds.userData.id,
          item_name: this.product[index].itemname,
          weight: this.product[index].weight,
          rate: Math.round(this.product[index].weight * this.product[index].retailrate),
        };
      }
      this.loader_visible=true;

      this.http
        .post(`${this.ds.serverUrl}add_item_to_cart`, this.datatosend)
        .subscribe((res): any => {
          this.loader_visible=false;
          let temp: any = res;
          this.productCount = temp.count;
          document.getElementById("snackbar_error").textContent = "Item added to cart successfully.";
          var x = document.getElementById("snackbar");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 3000);
        });
    }

    // console.log(this.product[index]);
    // this.ps.addToCart.push(this.product[index]);
    // console.log(this.ps.addToCart);
  }

  cart() {
    this.router.navigate([`cart/${this.ds.userData.id}`]);
    // console.log(this.ds.userData.id);
  }

  goToOrderHistory() {
    this.router.navigate([`order`]);
    // this.ds.showAlert()
    // this.ds.showConfirm()
    // this.ds.showPrompt()
    // this.ds.presentAlert()
  }

  goToProfile() {
    this.router.navigate([`profile`]);
  }

  settings() {
    this.router.navigate([`settings`]);
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.didInit = true;
  }
}
