import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { ContainerService } from '../container.service';
import { ManifestElement } from '../container';
import { MatTableDataSource} from '@angular/material/table';
import { Manifest } from '../mock-container';
import {ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogOverviewExampleDialog  } from './dialog-overview-example-dialog';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  name: string;
  selectedContainer:ManifestElement;
  ELEMENT_DATA: ManifestElement[];
  dataSource:MatTableDataSource<ManifestElement>;

  displayedColumns: string[] = ['id', 'containerID', 'content', 'location','type','weight','size','DG','arrival','sender'];

  selection = new SelectionModel<ManifestElement>(true, []);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
 @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private ContainerService: ContainerService,public dialog: MatDialog) {
    this.dataSource=new MatTableDataSource(this.ELEMENT_DATA);
    console.log(1);
  }

  applyFilter(filterValue: string){
  //const filterValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();
    console.log(3)
    if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();}
  }

  ngOnInit() {
    //this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getManifest();

  }
  onSelect(Container:ManifestElement): void {
    this.selectedContainer =Container ;
  }

  getManifest() {
    this.ContainerService.getManifest()
        .subscribe(Manifest => this.ELEMENT_DATA=Manifest);
  this.dataSource=new MatTableDataSource(this.ELEMENT_DATA);
  console.log(2);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name,}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.name = result;
    });
  }

}

