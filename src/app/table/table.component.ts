import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';


export interface ManifestElement {
  id: number;
  containerID: string;
  // Should be a Array of something, but depends on the data  !!
  content: string;
  location: string;
}

const ELEMENT_DATA: ManifestElement[] = [
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
  { id: 588519, containerID: 'AME171', content: '1 ea 12 1/4<< Taper Mill, 6 5/8<<REG Pin', location: 'Area II row 2. 3' },
  { id: 588519, containerID: 'AME171', content: '1 ea 12 1/4<< Taper Mill, 6 5/8<<REG Pin', location: 'Area II row 2. 3' },
  { id: 588519, containerID: 'AME171', content: '1 ea 12 1/4<< Taper Mill, 6 5/8<<REG Pin', location: 'Area II row 2. 3' },
  { id: 588519, containerID: 'AME171', content: '1 ea 12 1/4<< Taper Mill, 6 5/8<<REG Pin', location: 'Area II row 2. 3' },

];


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'containerID', 'content', 'location'];
  dataSource = ELEMENT_DATA;
  selection = new SelectionModel<ManifestElement>(true, []);

  constructor() { }

  ngOnInit(): void {
  }


}
