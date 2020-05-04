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
  { id:589987 , containerID:'AUR1010116O', content: '',location: 'Area II row 2. 3' }, 
  { id:58988 , containerID:'AORU1013120', content: '',location: 'Area II row 2. 3' }, 
  { id:589989 , containerID:'AURO1013985', content: '',location: 'Area II row 2. 3' }, 
  { id:577228 , containerID:'AURO2302513', content: '',location: 'Area II row 2. 3' },
  { id:585895 , containerID:'BL-14-14', content:'',location: 'Area II row 2. 3'},
  { id:589446 , containerID:'BL-14-16', content: '',location: 'Area II row 2. 3' },
  { id:582064 , containerID:'BL-16-06', content: '', location: 'Area II row 2. 3'},
  { id:585893 , containerID:'BL-10-02', content: '',location: 'Area II row 2. 3' },
  { id:585894 , containerID:'BL-12-01', content: '',location: 'Area II row 2. 3' },
  { id:576416 , containerID:'C-10-250', content: '' ,location: 'Area II row 2. 3'},
  { id:586440 , containerID:'CBV342', content: '' ,location: 'Area II row 2. 3'},
  { id:589993 , containerID:'CBVA015', content: '' ,location: 'Area II row 2. 3'},
  { id:579683 , containerID:'CBW211', content: '' ,location: 'Area II row 2. 3'},
  { id:568956 , containerID:'CBX024', content: '' ,location: 'Area II row 2. 3'},
  { id:580616 , containerID:'CBXN026', content: '', location: 'Area II row 2. 3'},
  { id:583639 , containerID:'CBZ087', content: '', location: 'Area II row 2. 3'},
  { id:589289 , containerID:'F712', content: '',location: 'Area II row 2. 3' },
  { id:582067 , containerID:'FB-3,7-825', content: '' ,location: 'Area II row 2. 3'},
  { id:589291 , containerID: 'FR198', content: '',location: 'Area II row 2. 3' },
  { id:589292 , containerID: 'FR217', content: '',location: 'Area II row 2. 3' },
  

];

const Containernull:ContainerElement[]=[
  {name: 'Empty', itemId:0 , amount:"", weight:"", recipient:""},
];
const FoodContainerEmpty:ContainerElement[]=[
  {name:'Empty Food Container', itemId:-1 , amount:"0", weight:"", recipient:""},
  ];
const Container589985:ContainerElement[]=Containernull;
const Container589992:ContainerElement[]=Containernull;
const Container589987=Containernull;
const Container589988=Containernull;
const Container589989=Containernull;
const Container577228=Containernull;
const Container589291:ContainerElement[]=FoodContainerEmpty;
const Container589292:ContainerElement[]=FoodContainerEmpty; 

const Container588519:ContainerElement[]=[
  {name: '5 ea Drums w/ oil contaminated Waste (SAR AS)', itemId: 300908252, amount: "1", weight:"1.01",recipient:"SAR AS"},
  {name: '1 ea Pallet W/ Empty Cans.', itemId: 300908252, amount:"1", weight:"1.01",recipient:""},
];
const Container57l414:ContainerElement[]=[
  {name: 'instrument package (Gauges, transducer, debooster, hexnuts)', itemId:null , amount: "1", weight:"1.9T",recipient:null},
  {name: '5 ea MST Stinger protector', itemId: 300908252, amount: "1", weight:"",recipient:""},
];

const Container585893:ContainerElement[]=[
  {name:'1ea 14 1/4" Taper Mill, 6/8" REG Box x Pin', itemId:null , amount:"1", weight:"", recipient:""},
  {name: '1ea 14 1/4" Taper Mill, 6/8" REG Box x Pin', itemId:null , amount:"1", weight:"", recipient:""},
  {name: '1 ea 17 1/2" String Mill, 6 5/8" REG Box x Pin', itemId:null , amount:"1", weight:"", recipient:""},
  {name: '1 ea ALO Valve, 6 5/8" REG Box x Pin', itemId:0 , amount:"1 ea", weight:"", recipient:""},
  {name: '1 ea Pup Joint, 5 7/8" OD Shank, 6 5/8" REG Box xPin', itemId:null , amount:"3", weight:"", recipient:""},
  {name: ' 1 ea Slip Joint, 6 5/8" REG Box x Pin', itemId:null , amount:"1", weight:"", recipient:""},
];
const Container585894:ContainerElement[]=[
  {name: '1 ea 11 3/4" IP Cutter, 6 5/8" REG Box x Box', itemId:null , amount:"2", weight:"", recipient:""},
  {name: '1 ea 12 1/4" String Stabilizer, 6 5/8" REG Box x Pin', itemId:null , amount:"2", weight:"", recipient:""},
  {name: '1 ea 12 1/4" Taper Mill, 6 5/8" REG Pin', itemId:null , amount:"2", weight:"", recipient:""},
  {name: '1 ea 13 3/8" FRM Spaer, 6 5/8" REG Box x Pin', itemId:null , amount:"1", weight:"", recipient:""},
  {name: '1 ea ALO Valve, 6 5/8" REG Box x Pin', itemId:null , amount:"1", weight:"", recipient:""},
  {name: '1 ea ALU box spare parts', itemId:null , amount:"1", weight:"", recipient:""},
  {name: '1 ea Pup Joint, 5 7/8" OD Shank, 6 5/8" REG Box xPin', itemId:null , amount:"3", weight:"", recipient:""},
  {name: '1 ea Slip Joint, 6 5/8" REG Box x Pin', itemId:null , amount:"", weight:"", recipient:""},
];

const Container585895:ContainerElement[]=[
  {name: '1 ea Down Hole Power Tool (DHPT), XT 57 Box x 65/8" REG Pin', itemId:null , amount:"2", weight:"", recipient:""},
  {name: '1 ea Pup Joint, 6 5/8" REG Box x XT 57 Pin', itemId:null , amount:"2", weight:"", recipient:""},
];


const Container589446:ContainerElement[]=[
  {name: '1 set Ardyne div. Equipment', itemId:null , amount:"1", weight:"", recipient:""},
];

const Container582064:ContainerElement[]=[
  {name: '1 ea 12 1/4" String Mill, 6 5/8" REG Box x Pin', itemId:null , amount:"1", weight:"", recipient:""},
  {name: '1 ea 6 3/4" PDM Mud motor, NC 50 Box x 4 1/2"REG Box', itemId:null , amount:"1", weight:"", recipient:""},
  {name: '1 ea 6 3/4" PDM Mud motor, NC 50 Box x 4 1/2"REG Box', itemId:null , amount:"1", weight:"", recipient:""},
  {name: '1 ea 8 1/2" Taper Mill, DPM DS 50 Box', itemId:null , amount:"1", weight:"", recipient:""},
  {name: '1 ea 9 5/8" FRM Spear, 6 5/8" REG Box x Pin', itemId:null , amount:"1", weight:"", recipient:""},
  {name: '1 ea ALO Valve, 6 5/8" REG Box x Pin', itemId:null , amount:"1", weight:"", recipient:""},
  {name: '1 ea Float Valve, DPM DS 50 Box x Pin', itemId:null , amount:"1", weight:"", recipient:""},
  {name: '1 ea Pup Joint, 5 7/8" OD Shank, 6 5/8" REG Box xPin', itemId:null , amount:"4", weight:"", recipient:""},
  {name: '1 ea Pup Joint, DPM DS 50 Box x Pin', itemId:null , amount:"1", weight:"", recipient:""},
  {name: '1 ea SSV Valve, 6 5/8" REG Box x Pin', itemId:null , amount:"1", weight:"", recipient:""},
  {name: '1 ea SSV Valve, NC 50 Box x Pin', itemId:null , amount:"1", weight:"", recipient:""},
  {name: '1 ea Slip Joint, 6 5/8" REG Box x Pin', itemId:null , amount:"1", weight:"", recipient:""},
  {name: '1 ea X-over sub, 4 1/2" REG Pin x 6 5/8" REG Pin', itemId:null , amount:"1", weight:"", recipient:""},
  {name: '1 ea X-over sub, 6 5/8" REG Box x DPM DS 50 Pin', itemId:null , amount:"3", weight:"", recipient:""},
];

const Container576416:ContainerElement[]=[
  {name: '1 ea Båt slange', itemId:null , amount:"1", weight:"", recipient:" Halliburton for lagring"},
];

const Container586440:ContainerElement[]=[
  {name: '1 ea 12 1/4" Venturi assembly', itemId:null , amount:"1", weight:"", recipient:""},
  {name: '1 ea Fishing magnet', itemId:null , amount:"1", weight:"", recipient:""},
];
const Container589993:ContainerElement[]=[
  {name: ' 1 ea Drilling: 6 1/2" BULLNOSE premade, 4/14/32nozzles', itemId:11565353 , amount:"1", weight:"", recipient:""},
  {name: '1 ea Drilling: Pup joint premade, 2.5meter, 5 1/2"shank OWS-XOS-PJ- 1362', itemId:null , amount:"1", weight:"", recipient:""},
  {name: '1 ea Drilling: UR800 body with 17.7" arm´s', itemId:971866804 , amount:"1", weight:"", recipient:""},
];
const Container579683:ContainerElement[]=[
  {name: '1 ea 13 3/8" Cutting assembly', itemId:null , amount:"2", weight:"", recipient:""},
];
const Container568956:ContainerElement[]=[
  {name: '1 ea BOP Jetting assy', itemId:null , amount:"1", weight:"", recipient:""},
  {name: '1 ea Box with shovels to clean magnet', itemId:null , amount:"1", weight:"", recipient:""},
  {name: '2 ea Magnet Assy', itemId:null , amount:"1", weight:"", recipient:""},
];
const Container580616:ContainerElement[]=[
  {name: '1 ea 13 3/8" Hanger milling Assembly', itemId:null , amount:"2", weight:"", recipient:""},
  {name: '1 ea B/U 13 3/8" Hanger milling assembly', itemId:null , amount:"1", weight:"", recipient:""},
];
const Container583639:ContainerElement[]=[
  {name: '1 ea 17 1/2" Milling assembly for 13 3/8" hanger', itemId:null , amount:"2", weight:"", recipient:""},
];
const Container589289:ContainerElement[]=[
  {name: 'I-MOP for rep. (Premiere Produkter)', itemId:null , amount:"1", weight:"", recipient:""},
];
const Container582067:ContainerElement[]=[
  {name: '1 ea 11 1/4" Casing Slips', itemId:null , amount:"1", weight:"", recipient:""},
  {name: '1 ea 11 1/4" Safety Clamp', itemId:null , amount:"1", weight:"", recipient:""},
  {name: '1 ea ALU box Spare parts', itemId:null , amount:"1", weight:"", recipient:""},
  {name: '1 ea Tools for ALO and FRM Spear', itemId:null , amount:"1", weight:"", recipient:""},
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
  constructor() { }

  ngOnInit(): void {
  }

}
