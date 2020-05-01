import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';


export interface ManifestElement {
  id: number;
  containerID: string;
  // Should be a Array of something, but depends on the data  !!
  content: string;  //IN A SEPERAT STRINGS !!
  location: string;
  //owner:string //owner of the container
}

export interface ContainerElement{
  name: string;
  itemId: number; 
  amount:string; //amount of this itmes in stock in this container
  weight:string; //weight in metric tons
  recipient:string;  //where does the content goes after (for waste)   
}

const ELEMENT_DATA: ManifestElement[] = [
  { id: 588519, containerID: 'AME171', content: '1 ea 12 1/4<< Taper Mill, 6 5/8<<REG Pin', location: 'Area II row 2. 3' },
  { id: 576414, containerID: 'AMN550', content: '1 ea 12 1/4<< Taper Mill, 6 5/8<<REG Pin', location: 'Area II row 2. 3' },
  { id: 589985, containerID: 'AORU1004279', content: '1 ea 12 1/4<< Taper Mill, 6 5/8<<REG Pin', location: 'Area II row 2. 3' },
  { id: 589992, containerID: 'AORU6301449', content: '1 ea 12 1/4<< Taper Mill, 6 5/8<<REG Pin', location: 'Area II row 2. 3' },
  { id: 588519, containerID: 'AME171', content: '1 ea 12 1/4<< Taper Mill, 6 5/8<<REG Pin', location: 'Area II row 2. 3' },
  { id: 588519, containerID: 'AME171', content: '1 ea 12 1/4<< Taper Mill, 6 5/8<<REG Pin', location: 'Area II row 2. 3' },
  { id: 588519, containerID: 'AME171', content: '1 ea 12 1/4<< Taper Mill, 6 5/8<<REG Pin', location: 'Area II row 2. 3' },
  { id: 588519, containerID: 'AME171', content: '1 ea 12 1/4<< Taper Mill, 6 5/8<<REG Pin', location: 'Area II row 2. 3' },
  { id: 588519, containerID: 'AME171', content: '1 ea 12 1/4<< Taper Mill, 6 5/8<<REG Pin', location: 'Area II row 2. 3' },
  { id: 588519, containerID: 'AME171', content: '1 ea 12 1/4<< Taper Mill, 6 5/8<<REG Pin', location: 'Area II row 2. 3' },
  { id: 588519, containerID: 'AME171', content: '1 ea 12 1/4<< Taper Mill, 6 5/8<<REG Pin', location: 'Area II row 2. 3' },
  { id: 588519, containerID: 'AME171', content: '1 ea 12 1/4<< Taper Mill, 6 5/8<<REG Pin', location: 'Area II row 2. 3' },
  { id: 588519, containerID: 'AME171', content: '1 ea 12 1/4<< Taper Mill, 6 5/8<<REG Pin', location: 'Area II row 2. 3' },
  { id: 588519, containerID: 'AME171', content: '1 ea 12 1/4<< Taper Mill, 6 5/8<<REG Pin', location: 'Area II row 2. 3' },

];

const Containernull:ContainerElement[]=[
  {name: 'Empty', itemId:0 , amount:"", weight:"", recipient:""},
];
const Container589985:ContainerElement[]=Containernull;
const Container589992:ContainerElement[]=Containernull;

const Container588519:ContainerElement[]=[
  {name: 'Drums w/ oil contaminated Waste (SAR AS)', itemId: 300908252, amount: "5 ea", weight:"1.01",recipient:"SAR AS"},
  {name: '1 ea Pallet W/ Empty Cans.', itemId: 300908252, amount:"1 ea", weight:"1.01",recipient:""},
];
const Container57l414:ContainerElement[]=[
  {name: 'instrument package (Gauges, transducer, debooster, hexnuts)', itemId:null , amount: "1", weight:"1.9T",recipient:null},
  {name: 'MST Stinger protector', itemId: 300908252, amount: "5 ea", weight:"",recipient:""},
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'containerID', 'content', 'location'];
  dataSource = ELEMENT_DATA;
  containerinv=Containernull;
  selection = new SelectionModel<ManifestElement>(true, []);
  datasourcetemp=[];
  value=0;
  Quelle=[];
  constructor() { }

  ngOnInit(): void {
  }

 convertCon(element){
  this.value=element.id;
    switch(this.value){
        case 0:{
        this.datasourcetemp=Containernull;
        this.Quelle = this.datasourcetemp;

        break;
      }
      case 588519:{
        this.datasourcetemp=Container588519;
        this.Quelle = this.datasourcetemp;
        break;
      }
      case 576414:{
        this.datasourcetemp=Containernull;
        this.Quelle = this.datasourcetemp;
        break;
      }
      case 589985:{
        this.datasourcetemp=Container589985;
        this.Quelle = this.datasourcetemp;      
        break;
      }
      case 589992:{
        this.datasourcetemp=Container589992;
        this.Quelle = this.datasourcetemp;
        break;
      }
    }
  return this.Quelle;
 }


}
