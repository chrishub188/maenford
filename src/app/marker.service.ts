import { Injectable } from '@angular/core';

import * as L from 'leaflet';

export interface Container {
  // Primary key
  containerID: string;
  beaconID: string;
  marker: L.Marker;
  viewStatus: string;
}

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  private containersList: Container[];
  private icon;
  private marker;

  constructor() { this.containersList = []; }

  public addContainerToMap(map: L.Map, container: Container, initlLat: number, initLong: number): void {
    //console.log(container);
    const url = this.getIconUrl(container.viewStatus);

    this.icon = L.icon({
      iconUrl: url,
      iconSize: [38, 40],
      //iconAnchor: [15, 42],
      popupAnchor: [0, -12]
    });
    // For Demo"ID,B3,Lat,56.465120,Long,-2.926328"
    //this.marker = L.marker([56.465025, -2.927000], { icon: this.icon });
    this.marker = L.marker([initlLat, initLong], { icon: this.icon });
    this.marker.bindPopup('<b>Container:' + container.containerID + '</b>');
    this.marker.addTo(map);
    container.marker = this.marker;
    this.containersList.push(container);
    console.log('Container List');
    console.log(this.containersList);
  }

  private getIconUrl(status: string): string {
    let url: string;

    switch (status) {
      case 'inuse': url = 'assets/img/dev_map/containers/map_container_small_green.svg';
                    break;

      case 'empty': url = 'assets/img/dev_map/containers/map_container_small_red.svg';
                    break;

      default: url = 'assets/img/dev_map/containers/map_container_small_green.svg';
               break;
    }

    return url;
  }

  public removeContainerFromMap(map: L.Map, container: Container): void {
    map.removeLayer(container.marker);
    const index = this.containersList.indexOf(container);
    if (index > -1) {
      this.containersList.splice(index);
    }
  }

  public updatePositionByBeaconID(map: L.Map, beaconID: string, lat, lng): void {
    this.containersList.forEach((element, index) => {
      if (element.beaconID.localeCompare(beaconID) === 0) {
        this.marker = element.marker;
        this.marker.setLatLng([lat, lng]).update();
      }
    });
  }
}
