import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { DataService } from "./../Services/data.service";
import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import {
  ActionSheetController,
  ModalController,
  Platform,
} from "@ionic/angular";
import { Storage } from '@ionic/storage-angular';

import {
  Camera,
  CameraOptions,
  PictureSourceType,
} from "@ionic-native/camera/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
import { finalize } from "rxjs/operators";
import { File, FileEntry } from "@ionic-native/file/ngx";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  areas: any = [];
  area_id;
  userData;
  lastImage;

  data = {
    id: "",
    full_name: "",
    email: "",
    address: "",
    area_id: "",
    image: "noimage.png",
  };
  formData = new FormData();
  imgBlob = new Blob();
  imgName;
  imgURl =
    "https://amrutahatcheries.com/amruta_panel/amruta/public/register_user_profile/noimage.png";
  constructor(
    public cd: ChangeDetectorRef,
    public modalController: ModalController,
    public http: HttpClient,
    public st: Storage,
    public ds: DataService,
    private router: Router,
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    public file: File,
    public filePath: FilePath,
    public platform: Platform
  ) {
    // this.getDataFromDB()
    st.get("user_data").then((res) => {
      this.userData = res;
      console.log("calling from profile page: ", res);
      this.data.id = this.userData.id;

      this.data.full_name = this.userData.full_name;
      this.data.email = this.userData.email;
      this.data.address = this.userData.address;
    //  this.data.area_id = this.userData.area_id;
      console.log(this.userData.area_id)
      this.data.image = this.userData.image;

      this.imgURl = `${ds.registerUserImage}${this.userData.image}`;
      // console.log(this.data);
    });
    // this.http.get(`${ds.serverUrl}get_area_api`).subscribe(
    //   (data) => {
    //     this.areas = data;
    //     //  console.log(this.areas);
    //   },
    //   (err) => console.log(err)
    // );
  }

  ngOnInit() { }

  selectArea() {
    //console.log(this.data.area_id);
  }

  async selectImage() {
    // console.log(1);
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      mode: "ios",
      buttons: [
        {
          text: "Load from Library",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: "Use Camera",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          },
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ],
    });
    await actionSheet.present();
  }

  // capturing image form selected option
  takePicture(sourceType: any) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      targetWidth: 200,
      targetHeight: 200,
      cameraDirection: 1,
      allowEdit: false,
    };

    this.camera.getPicture(options).then((imageData) => {
      // this.clickedImage = (<any>window).Ionic.WebView.convertFileSrc(imageData);
      this.imgURl = (<any>window).Ionic.WebView.convertFileSrc(imageData);

      if (
        this.platform.is("android") &&
        sourceType === this.camera.PictureSourceType.PHOTOLIBRARY
      ) {
        this.filePath.resolveNativePath(imageData).then((filePath) => {
          const correctPath = filePath.substr(0, filePath.lastIndexOf("/") + 1);
          const currentName = imageData.substring(
            imageData.lastIndexOf("/") + 1,
            imageData.lastIndexOf("?")
          );
          this.copyFileToLocalDir(
            correctPath,
            currentName,
            this.createFileName()
          );
        });
      } else {
        const currentName = imageData.substr(imageData.lastIndexOf("/") + 1);
        const correctPath = imageData.substr(0, imageData.lastIndexOf("/") + 1);
        this.copyFileToLocalDir(
          correctPath,
          currentName,
          this.createFileName()
        );
      }

      // this.uploadImageData();
    });
  }

  //Copy Files & Store Local Reference
  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file
      .copyFile(namePath, currentName, this.file.dataDirectory, newFileName)
      .then(
        (success) => {
          // this.updateStoredImages(newFileName);
          this.lastImage = newFileName;

          let filePath = this.file.dataDirectory + this.lastImage;
          let resPath = this.pathForImage(filePath);

          let newEntry = {
            name: this.lastImage,
            path: resPath,
            filePath: filePath,
          };
          this.startUpload(newEntry);
          //console.log(JSON.stringify(newEntry));
        },
        (error) => {
          //console.log(JSON.stringify(error));
        }
      );
  }

  pathForImage(img: string) {
    if (img === null) {
      return "";
    } else {
      return this.file.dataDirectory + img;
    }
  }

  startUpload(imgEntry) {
    this.file
      .resolveLocalFilesystemUrl(imgEntry.filePath)
      .then((entry) => {
        (<FileEntry>entry).file((file) => this.readFile(file));
      })
      .catch((err) => {
        // console.log("Error" + "Error while reading file.");
      });
  }

  // converting file into img blob data to and attaching with FormData for uploading to server
  readFile(file: any) {
    this.imgName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      this.imgBlob = new Blob([reader.result], {
        type: file.type,
      });

      // this.uploadImageData(formData);
    };
    reader.readAsArrayBuffer(file);
  }

  // update profile pic
  update() {
    // console.log(this.imgBlob.size);
    if (this.imgBlob.size == 0) {
      this.formData.append("image", this.data.image);
      this.formData.append("id", this.data.id);
      this.formData.append("full_name", this.data.full_name);
      this.formData.append("email", this.data.email);
   //   this.formData.append("address", this.data.address);
   //   this.formData.append("area_id", this.data.area_id);

      //console.log(this.data);
      this.http
        .post(`${this.ds.serverUrl}update_user_api`, this.formData)
        .subscribe((res) => {
          this.st
            .set("user_data", res)
            .then((user) => {
              if (user != "error") {
                // console.log(user);
                // this.imgURl = `https://amrutahatcheries.com/amruta_panel/amruta/public/register_user_profile/${user.image}`;
                this.imgURl = `${this.ds.registerUserImage}${user.image}`;
                //  console.log(this.imgURl);
                this.cd.detectChanges();
                document.getElementById("snackbar_error").textContent = "Profile updated succesfully.";
                var x = document.getElementById("snackbar");
                x.className = "show";
                setTimeout(function () {
                  x.className = x.className.replace("show", "");
                }, 3000);
              }
            })
            .catch((err) => {
              //console.log(err);
            });
        });
    } else {
      this.formData.append("image", this.imgBlob, this.imgName);
      this.formData.append("id", this.data.id);
      this.formData.append("full_name", this.data.full_name);
      this.formData.append("email", this.data.email);
      this.formData.append("address", this.data.address);
      this.formData.append("area_id", this.data.area_id);
      this.data.image = this.imgName;
      //console.log(this.data);
      this.http
        .post(`${this.ds.serverUrl}update_user_api`, this.formData)
        .subscribe((res) => {
          this.st
            .set("user_data", res)
            .then((user) => {
              if (user != "error") {
                this.imgURl = `${this.ds.registerUserImage}${user.image}`;
                // console.log(this.imgURl);
                this.cd.detectChanges();
                document.getElementById("snackbar_error").textContent = "Profile updated succesfully.";
                var x = document.getElementById("snackbar");
                x.className = "show";
                setTimeout(function () {

                  x.className = x.className.replace("show", "");

                }, 3000);
                // this.router.navigate(["frontpage"]);
              }
            })
            .catch((err) => {
              // console.log(err);
            });
        });
    }
  }
}
