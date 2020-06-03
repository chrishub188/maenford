import { Component, OnInit, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { MarkerService,Container } from '../marker.service';

//Leaflet plus addons 
import * as L from 'leaflet';
import { LatLngBoundsExpression } from 'leaflet';
import 'leaflet-easybutton';
import 'leaflet-easybutton/src/easy-button.css';
import 'leaflet-rotatedmarker';

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
  container1: Container;
  container2: Container;

  constructor(private mqttService: MqttService, private markerService: MarkerService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Set configuration of the rig
    this.initMap();
  }

  ngOnInit(): void {
    // Publish anker position of the rig 
    //Message format ID,A0,Lat,56.465185,Long,-2.926419
    this.mqttService.unsafePublish('server/position_in', 'Anchor,Lat,56.465185,Long,-2.926419');
    this.subscribeNewTopic('server/position_out');
  }

  private initMap(): void {
    // Create map
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoomSnap: 0.1,
      scrollWheelZoom: false,
      //disable zoomControl when initializing map (which is topleft by default)
      zoomControl: false
    });

    //add zoom control again with topright option
    L.control.zoom({
      position: 'topright'
    }).addTo(this.map);

    //Add easy button to center location
    L.easyButton(
      '<img src="assets/img/marker_white.svg" style="width: 20px; height: 20px; padding-right: 5px;">',
      (btn, map) => { map.setView([56.465185, -2.926419], 19.7); }).addTo(this.map);

    // Add rig image
    const imageUrl = 'assets/img/dev_map/new/map_maersk_basis_new.svg';
    const imageBounds: LatLngBoundsExpression = [[56.465552, -2.927335], [56.464787, -2.925404]];
    const image = L.imageOverlay(imageUrl, imageBounds).addTo(this.map);
    L.imageOverlay('assets/img/dev_map/map_maersk_only_areas.svg', [[56.465552, -2.927335], [56.464787, -2.925404]]).addTo(this.map);
    L.imageOverlay('assets/img/dev_map/map_maersk_only_containers.svg', [[56.465552, -2.927335], [56.464787, -2.925404]]).addTo(this.map);
    // Set view on image
    this.map.setView([56.465185, -2.926419], 19.7);

    this.container1 = {
      containerID: 'AME170',
      beaconID: 'B3',
      marker: null,
     viewStatus: 'inuse',
    } as Container;

    this.container2 = {
      containerID: 'AMN550',
      beaconID: 'B2',
      marker: null,
      viewStatus: 'empty',
    } as Container;

    this.markerService.addContainerToMap(this.map, this.container1);
    this.markerService.addContainerToMap(this.map, this.container2);
  }

  private subscribeNewTopic(topic: string): void {
    this.topicname = topic;
    this.subscription = this.mqttService.observe(this.topicname).subscribe((message: IMqttMessage) => {
      this.msg = message;
      //console.log(message.payload.toString().split(','));
      console.log(message.payload.toString());
      let messageItems = message.payload.toString().split(',');
      this.markerService.updatePositionByBeaconID(this.map, messageItems[1], messageItems[3], messageItems[5]);
    });
  }

}