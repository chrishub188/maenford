import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ManifestElement } from '../container';
import { ContainertableDataSource, ContainertableItem, ContainerElement } from './containertable-datasource';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from './dialog-overview-example-dialog';

@Component({
  selector: 'app-containertable',
  templateUrl: './containertable.component.html',
  styleUrls: ['./containertable.component.scss']
})
export class ContainertableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ContainertableItem>;
  dataSource: ContainertableDataSource;

  // Value of toggle-button containers and items
  toggleValue: string;
  // Status of the content colummn
  status: string;
  // Toolbar counter values
  containers: number;
  baskests: number;
  items: number;
  name: string;

  selectedContainer: ManifestElement;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'status',
    'containerID',
    'content',
    'location',
    'type',
    'weight',
    'size',
    'DG',
    'arrival',
    'sender'];

  constructor(public dialog: MatDialog) {
    this.dataSource = new ContainertableDataSource();
  }


  ngOnInit() {
    this.dataSource = new ContainertableDataSource();
    // Initial displayed table
    this.status = 'collapse';
    this.toggleValue = 'containers';

    //Count items on the rig
    this.countBaskets();
    this.countContainers();
    this.countItems();

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }


  // Change value to toggle between containers and items
  public onValChange(val: string) {
    console.log(val);
    this.toggleValue = val;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '750px',
      height: '321px',
      data: { name: this.name, func: this.applyFilter, dataSource: this.dataSource }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.name = result;
    });
  }

  // Counts all containers from items in "database/file"
  private countContainers(): void {
    this.containers = 14;
  }
  // Counts all baskets from items in "database/file"
  private countBaskets(): void {
    this.baskests = 10;
  }
  // Counts all items from items in "database/file"
  private countItems(): void {
    this.items = 289;
  }

  public showMore(): void {
    const dots = document.getElementById('dots');
    const moreText = document.getElementById('more');
    const btnText = document.getElementById('myBtn');
    const dotsC = document.getElementById('dots');
    const moreTextC = document.getElementById('more');
    const btnTextC = document.getElementsByClassName('myBtn');
    console.log(dotsC);
    console.log(moreTextC);
    console.log(btnTextC);

    if (dots.style.display === 'none') {
      dots.style.display = 'inline';
      btnText.innerHTML = 'Read more';
      moreText.style.display = 'none';
    } else {
      dots.style.display = 'none';
      btnText.innerHTML = 'Read less';
      moreText.style.display = 'inline';
    }
  }

}
