import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableComponent } from './table.component';
import { Manifest } from '../mock-container';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';



@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./dialog-overview-example-dialog.scss'],
})
export class DialogOverviewExampleDialog {
  emptystring:string='';
  temp:string;
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSourcee = new MatTreeNestedDataSource<FoodNode>();

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data) { this.dataSourcee.data = TREE_DATA; }

  onNoClick(): void {
    this.dialogRef.close();
  }

    addfiltervalue(into:string) {
        this.data.name=into;
        this.temp=this.data.name;
        console.log(into +' hinzugefügt');
      };
      deleteOptions(){
        console.log( this.data.name);
        this.temp=' ';
        this.data.name=this.temp;
        console.log( this.data.name);
        console.log('auswahl entfernt');
    
        this.data.func(this.emptystring);
        console.log('filter aufgerufen');
      };
    sendfiltervalue(){this.data.func(this.temp);}

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
}


//submit button einfügen on click function ändern erste element anzeigen dafür html in cell elemnet und alle anderen elemente treestrukture;
// tree ng repeat ng class-even und-odd.
//
interface FoodNode {
  name: string;
  children?: FoodNode[];
}
//erstmal nicht als service; schnelle implementierung
const TREE_DATA: FoodNode[] = [
  {
    name: 'Status',
    children: [
      { name: 'Empty' },
      { name: 'Backload' },
      { name: 'In use' },
    ]
  }, {
    name: 'Type',
    children: [
      { name: 'Container' },
      { name: 'Basket' },
      { name: 'Palet' },
      { name: 'Skip' },
      { name: 'Frame' },
      { name: 'Tank' },
    ]
  }, {
    name: 'Location',
    children: [
      { name: 'Area 1' },
      { name: 'Area 2' },
      { name: 'Area 3' },
      { name: 'Area 4' },
      { name: 'Cantilever C1' },
      { name: 'Cantilever C2' },
      { name: 'Cantilever C3' },
      { name: 'Cantilever C4' },
    ]
  }, {
    name: 'Size',
    children: [
      { name: ' 6ft' },
      { name: ' 8ft' },
      { name: '10 ft' },
    ]
  }, {
    name: 'DG',
    children: [
      { name: '-' },
      { name:'1.4 UN 0352'},
    ]
  },{
    name: 'Sender',
    children: [
      { name: 'Maersk Drilling' },
      { name: 'BH Fishing Service' },
      { name: 'Ardyne AS' },
      { name: 'Haliburton CleanWell' },
      { name: 'Haliburton Cement' },
      { name: 'Ardyne AS Titan Systems' },
      { name: 'D.Danielsen' },
      { name: 'Haliburton BSS' },
      { name: 'Haliburton Bits' },
      { name: 'Baker Hughes' },
      { name: 'Westco Miljostasjon' },
      { name: 'Westco 8cup' },
      { name: 'Haliburton Baroid' },
    ]
  }, {
    name: 'Arrival',
    children: [
      { name:'01.01.2020'},
      { name:'02.01.2020'},
      { name:'03.01.2020'},
    ]
  }, {
    name: 'Weight',
    children: [
      { name: '0t-0.9t' },
      { name: '1.0t-1.9t' },
      { name: '2.0t-2.9t' },
      { name: '3.0t-3.9t' },
    ]
  },
];


