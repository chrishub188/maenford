import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { LatLngBoundsExpression } from 'leaflet';
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';


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
      center: [39.8282, -98.5795],
      zoom: 25,
    });
    // Add  open streetmap map layer to the map
    this.tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
    /// Add container marker with text popup
    this.containerMarker = L.divIcon({
      className: 'custom-div-icon',
      html: "<div style='background-color:#c30b82;' class='marker-pin'></div><i class='material-icons'>gps_fixed</i>",
      iconSize: [30, 42],
      iconAnchor: [15, 42]
    });
    this.marker = L.marker([56.465130, -2.926664], { icon: this.containerMarker });
    this.marker.bindPopup('I am a container');
    this.marker.addTo(this.map);
    // Add rig image
    const imageUrl = 'assets/img/rig_plan_01.svg';
    const imageBounds: LatLngBoundsExpression = [[56.465552, -2.927335], [56.464787, -2.925404]];
    const image = L.imageOverlay(imageUrl, imageBounds).addTo(this.map);
    // Set view on image
    this.map.setView([56.465130, -2.926664], 25);
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
