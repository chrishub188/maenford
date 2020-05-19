import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { LatLngBoundsExpression } from 'leaflet';
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import 'leaflet-easybutton';
import 'leaflet-easybutton/src/easy-button.css';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription: Subscription;
  topicname: any;
  msg: any;
  isConnected = false;
  private map;
  private tiles;
  private marker;
  private containerMarker;

  constructor(private _mqttService: MqttService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnInit(): void {
    this.subscribeNewTopic('beacon/output');
  }

  private initMap(): void {
    // Create map
    this.map = L.map('map', {
      center: [40.251528, -74.630083],
      zoomSnap: 0.1,
      scrollWheelZoom: false,
      //disable zoomControl when initializing map (which is topleft by default)
      zoomControl: false
    });


    //add zoom control with topright option
    L.control.zoom({
      position: 'topright'
    }).addTo(this.map);
    // Add  open streetmap map layer to the map
    this.tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
    //Add easy button to center location
    L.easyButton(
    //'<span class="material-icons">location_on</span>',
    '<img src="assets/img/marker_white.svg" style="width: 20px; height: 20px; padding-right: 5px;">',
    (btn, map) => {map.setView([40.251528, -74.630083], 19.8); }).addTo(this.map);

    // let toggle = L.easyButton ({
    //   position: 'topright',
    //   states: [{
    //   stateName: 'remove-legend',
    //   icon: '<img src="assets/img/marker_white.svg" style="width: 20px; height: 20px">',
    //   title: 'masquer la légende',
    //   onClick: (btn, map) => {map.setView([56.465185, -2.926419], 19.8); }
    //     }]
    //   });
    //   toggle.addTo(map);

    // Add container marker with text popup
    this.containerMarker = L.icon({
      iconUrl: 'assets/img/dev_map/containers/map_container_small_green.svg',
      iconSize: [30, 42],
      iconAnchor: [15, 42]
    });
    this.marker = L.marker([40.251391, -74.629992], { icon: this.containerMarker });
    this.marker.addTo(this.map);
    // Add rig image
    const imageUrl = 'assets/img/dev_map/map_maersk_basis.svg';
    const imageBounds: LatLngBoundsExpression = [[40.251268, -74.630554], [40.251591, -74.629473]];
    const image = L.imageOverlay(imageUrl, imageBounds).addTo(this.map);
    L.imageOverlay('assets/img/dev_map/map_maersk_only_areas.svg', [[40.251268, -74.630554], [40.251591, -74.629473]]).addTo(this.map);
    // Set view on image
    this.map.setView([40.251364, -74.629905], 25);
  }

  private subscribeNewTopic(topic: string): void {
    this.topicname = topic;
    this.subscription = this._mqttService.observe(this.topicname).subscribe((message: IMqttMessage) => {
      this.msg = message;
      console.log(message.payload.toString().split(','));
      let messageItems = message.payload.toString().split(',');
      this.updateMarker(messageItems[3], messageItems[5]);
    });
  }

  private updateMarker(lat, lng): void {
    this.marker.setLatLng([lat, lng]).update();
  }
}
