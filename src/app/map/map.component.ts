import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { LatLngBoundsExpression } from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  private map;
  private tiles;
  private marker;
  private containerMarker;

  constructor() { }
  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnInit(): void {
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
    this.containerMarker = L.icon({
      iconUrl: 'assets/img/baseline_location_on_black_18dp.png',
      iconSize: [12, 12], // size of the icon
      // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    this.marker = L.marker([56.465130, -2.926664], { icon: this.containerMarker });
    this.marker.bindPopup('I am a container');
    this.marker.addTo(this.map);
    // Add rig image
    const imageUrl = 'assets/img/rig_plan_01.svg';
    const imageBounds: LatLngBoundsExpression = [[56.465552, -2.927335], [56.464787, -2.925404]];
    const image = L.imageOverlay(imageUrl, imageBounds).addTo(this.map);
    this.map.flyTo([56.465130, -2.926664], 18);
  }

}
