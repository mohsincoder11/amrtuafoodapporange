import { Component, ViewChild, ElementRef } from "@angular/core";
declare var google;
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DataService } from "./../Services/data.service";
import { NavController } from '@ionic/angular';
import { __core_private_testing_placeholder__ } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-show-map',
  templateUrl: './show-map.page.html',
  styleUrls: ['./show-map.page.scss'],
})
export class ShowMapPage {

  map;
  @ViewChild('mapElement') mapElement;
  shop_location;

  delivery_current_location = [
    { lat: 20.931582, lng: 77.7371163 },
    { lat: 20.936874, lng: 77.7431383 },
    { lat: 20.943951, lng: 77.7406863 },
    { lat: 20.947915, lng: 77.7388763 },
    { lat: 20.949523, lng: 77.7435063 },
    { lat: 20.951233, lng: 77.7457723 },
    { lat: 20.952556, lng: 77.7484863 },
  ];
  user_address = "Move home marker to select your address";
  user_lat = 20.938894;
  user_lang = 77.7421033;
  directionsService;
  user_marker;
  delivery_marker;
  current_delivery_lat = 20.930033;
  current_delivery_lng = 77.7517673;
  directionsRenderer;
  geolocationSubscription;
  selected_shop_id;
  btn_disabled=true;
  constructor(
    private geolocation: Geolocation,
    public ds: DataService,
    private navCtrl: NavController,
    public http: HttpClient

  ) {

  }

  confirm_address() {
    this.calculate_distance_from_shop();
    this.navCtrl.back();
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  calculate_distance_from_shop() {
    var cal_dis = [];
    var shop_id = [];
    for (var i = 0; i < this.shop_location.length; i++) {
      let shop_lat_lng = this.shop_location[i];
      shop_id[i] = shop_lat_lng['id'];
      shop_lat_lng = shop_lat_lng['lat_long'].split(',');
      var R = 6371; // Radius of the earth in km
      var dLat = this.deg2rad(shop_lat_lng[0] - this.user_lat);  // this.deg2rad below
      var dLon = this.deg2rad(shop_lat_lng[1] - this.user_lang);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(this.user_lat)) * Math.cos(this.deg2rad(shop_lat_lng[0])) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      cal_dis[i] = d.toFixed(2);
    }
    let min = Math.min.apply(null, cal_dis);
    this.find_shop_id(cal_dis, min,shop_id);
  }

  find_shop_id(cal_dis, min,shop_id) {
    for (var i = 0; i < cal_dis.length; i++) {
      if (cal_dis[i] == min) {
        this.selected_shop_id=shop_id[i];
        this.ds.order_shop_id=this.selected_shop_id;
      }
    }
  }

  ionViewDidEnter() {
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      {
        center: { lat: 20.945643, lng: 77.7639723 },
        zoom: 14,
        disableDefaultUI: true, // a way to quickly hide all controls
      });
    //  this.draw_map_line();
    this.geolocation.getCurrentPosition({
      maximumAge: 5000, timeout: 5000,
      enableHighAccuracy: true
    }).then((resp) => {
      this.get_user_current_position(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      //      console.log('Error getting location', error);
    });
    this.show_all_shop();
  }

  get_user_current_position(lat, lang) {
    this.user_marker = new google.maps.Marker({
      position: new google.maps.LatLng(
        lat, lang
      ),
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      icon: {
        url: `assets/icon/homemark.png`,
        scaledSize: new google.maps.Size(60, 60),
        origin: new google.maps.Point(0, 0),
      },
    });

    this.map.setZoom(18);
    var latLng2 = new google.maps.LatLng(lat, lang);
    this.map.panTo(latLng2);
    this.fetch_address(lat, lang);

    this.user_marker.addListener('dragend', (e) => {
      this.user_lat = e.latLng.lat();
      this.user_lang = e.latLng.lng();
      this.ds.user_map_lat = e.latLng.lat();
      this.ds.user_map_lan = e.latLng.lng();
      this.fetch_address(e.latLng.lat(), e.latLng.lng());

    });
  }


  fetch_address(lat, lng) {
    const reverseGeocodingUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true&key=AIzaSyD6d0aNvUiSWaENoQ1UuqCOzfMg0Wmq7Do";
    fetch(reverseGeocodingUrl).then(result => result.json())
      .then(featureCollection => {
        this.user_address = featureCollection.results[0].formatted_address;
        this.ds.user_map_address = featureCollection.results[0].formatted_address;
        this.ds.user_map_lat = lat;
        this.ds.user_map_lan = lng;
        this.btn_disabled=false;

      });
  }


  // Converts numeric degrees to radians

  show_all_shop() {
    this.http
      .get(`${this.ds.serverUrl}get_Shop_lat_long`)
      .subscribe(async (res: any) => {
        this.shop_location = res;
        for (var i = 0; i < this.shop_location.length; i++) {
          let shop_lat_lng = this.shop_location[i];
          shop_lat_lng = shop_lat_lng['lat_long'].split(',');
          new google.maps.Marker({
            position: new google.maps.LatLng(
              shop_lat_lng[0], shop_lat_lng[1]
            ),
            title: 'Amruta Chicken',
            map: this.map,
            icon: {
              url: `assets/icon/henmarker.png`,
              scaledSize: new google.maps.Size(60, 60), // scaled size
              origin: new google.maps.Point(0, 0), // origin
              anchor: new google.maps.Point(30, 60) // anchor
            },
          });
        }
      });


  }

  draw_map_line() {
    let polylineDotted = {
      strokeColor: "#00ff",
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
        this.ds.user_map_lat,
        this.ds.user_map_lan
      ),
      map: this.map,
      draggable: false,

      icon: {
        url: `assets/icon/homemark.png`,
        scaledSize: new google.maps.Size(60, 60), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(60, 60), // anchor
        scale: 1,
        rotation: 90

      },
    });

    this.delivery_marker = new google.maps.Marker({
      position: new google.maps.LatLng(
        20.9277298, 77.7323237
      ),
      map: this.map,
      icon: {
        url: `assets/icon/bike.png`,
        scaledSize: new google.maps.Size(40, 40), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(40, 40) // anchor

      },
    });

    this.update_delivery_location();
    this.update_draw_line();
  }



  update_delivery_location() {
    this.delivery_current_location.forEach((value, k) => {
      setTimeout(() => {
        this.animatedMove(
          this.delivery_marker,
          1,
          new google.maps.LatLng(
            this.current_delivery_lat,
            this.current_delivery_lng
          ),
          new google.maps.LatLng(
            this.user_lat,
            this.user_lang
          )
        );
        this.update_draw_line();
        this.current_delivery_lat = value.lat;
        this.current_delivery_lng = value.lng;
      }, k * 3000);
    });
  }

  animatedMove(marker, t, current, moveto) {
    var lat = current.lat();
    var lng = current.lng();
    let latlng = new google.maps.LatLng(lat, lng);
    marker.setPosition(latlng);
  }

  update_draw_line() {
    this.directionsService.route(
      {
        origin: new google.maps.LatLng(
          this.current_delivery_lat, this.current_delivery_lng
        ),
        destination: new google.maps.LatLng(
          this.user_lat,
          this.user_lang
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
