import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MaptableDataSource, MaptableItem } from './maptable-datasource';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-maptable',
  templateUrl: './maptable.component.html',
  styleUrls: ['./maptable.component.scss']
})
export class MaptableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<MaptableItem>;
  dataSource: MaptableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  // Switch button
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  ngOnInit() {
    this.dataSource = new MaptableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  applyFilter(filterValue: string) {
    //const filterValue=(event.target as HTMLInputElement).value;
    console.log(filterValue);
}
}
