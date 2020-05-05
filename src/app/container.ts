import { ArrayType } from '@angular/compiler';

export interface ContainerElement{
  name: string;
  itemId: number; 
  amount:string; //amount of this itmes in stock in this container
  weight:string; //weight in metric tons
  recipient:string;  //where does the content goes after (for waste)   
}
export interface ManifestElement  {
  id: number;
  containerID: string;
  // Should be a Array of something, but depends on the data  !!
  content:any //IN A SEPERAT STRINGS !!
  location: string;
  //owner:string //owner of the container
}
