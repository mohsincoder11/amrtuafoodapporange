import { Component, ViewChild, ElementRef } from "@angular/core";
declare var google;
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DataService } from "./../Services/data.service";
import { NavController } from '@ionic/angular';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.page.html',
  styleUrls: ['./track-order.page.scss'],
})
export class TrackOrderPage {

  map;
  @ViewChild('mapElement') mapElement;
  shop_location;
  directionsService;
  directionsRenderer;
  user_marker;
  delivery_marker;

  constructor(
    private navCtrl: NavController,
    public http: HttpClient,
    public activatedRoute: ActivatedRoute,
    public ds: DataService,


  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      {
        center: { lat: 20.945643, lng: 77.7639723 },
        zoom: 14,
        disableDefaultUI: true, // a way to quickly hide all controls
      });
      this.get_map_details();

    let autoSaveInterval = setInterval(() => {
      this.get_map_details();
    }, 10000);
  }

  get_map_details() {
    this.http
      .get(
        `${this.ds.serverUrl}get_track_details?order_id=${this.activatedRoute.snapshot.params.id}`
      )
      .subscribe((data) => {
        this.draw_line(data);
      });
  }

  draw_line(data) {

    let user_lat_lang = (data.user_lat).split(',');
    let deliveryboy_lat = (data.deliveryboy_lat).split(',');
    let polylineDotted = {
      strokeColor: "#0059bf",
    };

    const location = new google.maps.LatLng(
      20.9277298, 77.7323237
    );
    const options = {
      center: location,
      zoom: 14,
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: false,
      mapTypeId: "terrain",

    };
    this.directionsService = new google.maps.DirectionsService();
    // this.map = new google.maps.Map(this.mapElement.nativeElement, options);

    let rendererOptions = {
      map: this.map,
      suppressMarkers: true,
      polylineOptions: polylineDotted,
    };
    this.directionsRenderer = new google.maps.DirectionsRenderer(
      rendererOptions
    );

    this.directionsRenderer.setMap(this.map);

    this.user_marker = new google.maps.Marker({
      position: new google.maps.LatLng(
        user_lat_lang[0],
        user_lat_lang[1]
      ),
      map: this.map,
      draggable: false,

      icon: {
        url: `assets/icon/homemark.png`,
        scaledSize: new google.maps.Size(60, 60), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(30, 50), // anchor
        scale: 1,
        rotation: 90

      },
    });

    this.delivery_marker = new google.maps.Marker({
      position: new google.maps.LatLng(
        deliveryboy_lat[0], deliveryboy_lat[1]
      ),
      map: this.map,
      icon: {
        url: `assets/icon/bike.png`,
        scaledSize: new google.maps.Size(40, 40), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(30, 10) // anchor

      },
    });

    this.update_delivery_location(user_lat_lang, deliveryboy_lat);

  }

  update_delivery_location(deliveryboy_lat, user_lat_lang) {
    this.directionsService.route(
      {
        origin: new google.maps.LatLng(
          deliveryboy_lat[0], deliveryboy_lat[1]
        ),
        destination: new google.maps.LatLng(
          user_lat_lang[0],
          user_lat_lang[1],
        ),
        travelMode: "DRIVING",
      },
      (response, status) => {
        if (status === "OK") {
          this.directionsRenderer.setDirections(response);

        } else {
          //console.log("Directions request failed due to " + status);
        }
      }
    );
  }


}
