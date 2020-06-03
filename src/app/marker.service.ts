import { Injectable } from '@angular/core';

import * as L from 'leaflet';

export interface Container{
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

  public addContainerToMap(map: L.Map, container: Container ): void{
    //console.log(container);
    this.icon = L.icon({
      iconUrl: 'assets/img/dev_map/containers/map_container_small_green.svg',
      iconSize: [38, 40],
      iconAnchor: [15, 42]
    });
    this.marker = L.marker([56.465000, -2.927000], { icon: this.icon });
    this.marker.addTo(map);
    container.marker = this.marker;
    //console.log(this.marker);
    this.containersList.push(container);
    console.log('Container List');
    console.log(this.containersList);
  }
  // Todo not tested
  public removeContainerFromMap(map: L.Map, container: Container  ): void{
     map.removeLayer(container.marker);
     const index = this.containersList.indexOf(container);
     if (index > -1){
      this.containersList.splice(index);
     }
   }
  // Todo
  public findByContainerID(containerId: string): Container{
    // this.containersList.forEach(element => {
    //   if ( element.containerID.localeCompare(containerId) === 0){
    //     return element;
    //   }
    // });
    return null;
  }

  public updatePositionByBeaconID(map: L.Map, beaconID: string, lat, lng): void{
    this.containersList.forEach( (element, index) => {
      // console.log(index);
      // console.log(element);
      if ( element.beaconID.localeCompare(beaconID) === 0){
        this.marker = element.marker;
        this.marker.setLatLng([lat, lng]).update();
      }
    });
  }
}
