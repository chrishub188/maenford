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

  dataSource = new MatTreeNestedDataSource<FoodNode>();
  dataSourcee = new MatTreeNestedDataSource<FoodNode>();
  dataSourceetwo = new MatTreeNestedDataSource<FoodNode>();



  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data) { this.dataSourcee.data = TREE_DATA; this.dataSourceetwo.data=TREE_DATA_TWO;}

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
      { name: 'Backload' },
      { name: 'Empty'},
      { name: 'In use' },
    ]
  }, {
    name: 'Type',
    children: [
      { name: 'Basket' },
      { name: 'Container' },
      { name: 'Frame' },
      { name: 'Palet' },
      { name: 'Skip' },
      { name: 'Tank' },
    ]
  }, {
    name: 'Location',
    children: [
      { name: 'Area 1' },
      { name: 'Area 2' },
      { name: 'Area 3' },
      { name: 'Area 4' },
      { name: 'Cantilever'},
    ]
  },{
    name: 'Arrival',
    children: [
      { name:'01.01.2020'},
      { name:'02.01.2020'},
      { name:'03.01.2020'},
    ]
  },
];
  const TREE_DATA_TWO: FoodNode[] = [ {
    name: 'Size',
    children: [
      { name: ' 3 (1.6x1.9)' },
      { name: ' 3 (1.9 x 1.6)' },
      { name: '7.0 (6.5x1.2)' },
      { name: '7.3 (3x4.2)' },
    ]
  }, {
    name: 'DG',
    children: [
      { name: ' -' },
      { name:'1.4 UN 0352'},
    ]
  },{
    name: 'Sender',
    children: [
      { name: 'Ardyne AS' },
      { name: 'Baker Hughes' },
      { name: 'D.Danielsen' },
      { name: 'Haliburton Baroid' },
      { name: 'Haliburton Bits' },
      { name: 'Haliburton BSS' },
      { name: 'Haliburton Cement' },
      { name: 'Haliburton CleanWell'},
      { name: 'Maersk Drilling' },
      { name: 'Westco Miljostasjon' },
      { name: 'Westco 8cup' },
    ]
  },
  {
    name: 'Weight',
    children: [
      { name: '1.6' },
      { name: '1.9' },
      { name: '2.1' },
      { name: '2.5' },
    ]
  },];


// const TREE_DATA: FoodNode[] = [
//   {
//     name: 'Status',
//     children: [
//       { name: 'Backload' },
//       { name: 'Empty'},
//       { name: 'In use' },
//     ]
//   }, {
//     name: 'Type',
//     children: [
//       { name: 'Basket' },
//       { name: 'Container' },
//       { name: 'Frame' },
//       { name: 'Palet' },
//       { name: 'Skip' },
//       { name: 'Tank' },
//     ]
//   }, {
//     name: 'Location',
//     children: [
//       { name: 'Area 1' },
//       { name: 'Area 2' },
//       { name: 'Area 3' },
//       { name: 'Area 4' },
//       { name: 'Cantilever C1' },
//       { name: 'Cantilever C2' },
//       { name: 'Cantilever C3' },
//       { name: 'Cantilever C4' },
//     ]
//   }, {
//     name: 'Size',
//     children: [
//       { name: ' 3 (1.6x1.9)' },
//       { name: ' 3 (1.9 x 1.6)' },
//       { name: '7.0 (6.5x1.2)' },
//       { name: '7.3 (3x4.2)' },
//     ]
//   }, {
//     name: 'DG',
//     children: [
//       { name: ' -' },
//       { name:'1.4 UN 0352'},
//     ]
//   },{
//     name: 'Sender',
//     children: [
//       { name: 'Ardyne AS' },
//       { name: 'Baker Hughes' },
//       { name: 'BH Fishing Service' },
//       { name: 'D.Danielsen' },
//       { name: 'Haliburton Baroid' },
//       { name: 'Haliburton Bits' },
//       { name: 'Haliburton BSS' },
//       { name: 'Haliburton Cement' },
//       { name: 'Haliburton CleanWell'},
//       { name: 'Maersk Drilling' },
//       { name: 'Westco Miljostasjon' },
//       { name: 'Westco 8cup' },

//     ]
//   }, {
//     name: 'Arrival',
//     children: [
//       { name:'01.01.2020'},
//       { name:'02.01.2020'},
//       { name:'03.01.2020'},
//     ]
//   }, {
//     name: 'Weight',
//     children: [
//       { name: '1.6' },
//       { name: '1.9' },
//       { name: '2.1' },
//       { name: '2.5' },
//     ]
//   },
// ];
