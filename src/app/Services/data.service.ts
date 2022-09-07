import { Storage } from '@ionic/storage-angular';
import { Injectable } from "@angular/core";
import { AlertController, LoadingController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class DataService {
  
  // serverUrl = `http://localhost/amruta/api/`;
  // serverImage = `http://localhost/amruta/public/images/itemimage`;
  // offersImage = `http://localhost/amruta/public/images/promoimage`;
  // registerUserImage = `http://localhost/amruta/public/register_user_profile/`;

  //  serverUrl = `https://webmediaindia.co.in/amruta_map_demo/api/`;
  //  serverImage = `https://webmediaindia.co.in/amruta_map_demo/public/images/itemimage`;
  //  registerUserImage = `https://webmediaindia.co.in/amruta_map_demo/public/register_user_profile/`;
  //  offersImage = `https://webmediaindia.co.in/amruta_map_demo/public/images/promoimage`;
  
  serverUrl = `https://amrutahatcheries.com/amruta_panel/amruta/api/`;
  serverImage = `https://amrutahatcheries.com/amruta_panel/amruta/public/images/itemimage`;
  registerUserImage = `https://amrutahatcheries.com/amruta_panel/amruta/public/register_user_profile/`;
  offersImage = `https://amrutahatcheries.com/amruta_panel/amruta/public/images/promoimage`;

  userData: any;
  alertCtrl: any;
  isUserPresent: boolean;
  loginData: any;
  codePushProgress;
  user_map_address:any='Choose your delivery location';
  user_map_lat;
  user_map_lan;
  order_shop_id;
  

  modal_pass_item_value=0;
  constructor(
    public alertController: AlertController,
    public st: Storage,
    public loadingCtrl: LoadingController
  ) {
    this.st.create();

    this.st
      .get("user_data")
      .then((res) => {
        this.loginData = res;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // <!-- 1st alert-->

  async showAlert() {
    const alert = await this.alertController.create({
      mode: "ios",
      message: `<div>
            <img src="assets/sucess.jpeg" alt="" >
          </div>
          <center style="margin-left: -20%">
          <strong style = 'font-size:larger;' >
          Success
          </strong> <br>
          <span style="font-size: small"> 
          Congratulation, your account has been created
          </span>
          </center>
`,
      buttons: ["OK"],
    });

    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

  async startLoading() {
    const load = await this.loadingCtrl.create({
      mode: "ios",
      message: "Please wait...",
      cssClass: "my-custom-class",
    });
    await load.present();
  }

  stopLoading() {
    this.loadingCtrl.dismiss();
  }

  // <!-- 2st alert-->

  // async showConfirm() {
  //   const confirm = await this.alertController.create({
  //     header: "Thank You!",
  //     mode: "ios",
  //     message: "Your Order has been Placed Successfully..!!",
  //     buttons: [
  //       {
  //         text: "Cancel",
  //         role: "cancel",
  //         handler: () => {
  //           console.log("Confirm Cancel");
  //         },
  //       },
  //       {
  //         text: "Okay",
  //         handler: () => {
  //           console.log("Confirm Okay.");
  //         },
  //       },
  //     ],
  //   });
  //   await confirm.present();
  // }

  // <!-- 3st alert-->

  // showPrompt() {
  //   this.alertController
  //     .create({
  //       header: "Ok..",
  //       mode: "ios",
  //       subHeader: "Thank you for your order.",
  //       message: "",

  //       buttons: [
  //         {
  //           text: "Cancel",
  //           handler: (data: any) => {
  //             console.log("Canceled", data);
  //           },
  //         },
  //         {
  //           text: "Done!",
  //           handler: (data: any) => {
  //             console.log("Saved Information", data);
  //           },
  //         },
  //       ],
  //     })
  //     .then((res) => {
  //       res.present();
  //     });
  // }

  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     cssClass: "my-custom-class .alert-wrapper",
  //     header: "Alert",
  //     mode: "ios",
  //     subHeader: "Subtitle",
  //     message: "This is an alert message.",
  //     buttons: ["OK"],
  //   });

  //   await alert.present();
  // }
}
