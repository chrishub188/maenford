import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { ContainerService } from '../container.service';
import { ManifestElement } from '../container';
import { MatTableDataSource } from '@angular/material/table';
import { Manifest } from '../mock-container';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from './dialog-overview-example-dialog';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
    // Value of toggle-button containers and items
    toggleValue: string;

    containers: number;
    baskests: number;
    items: number;

    name: string;
    selectedContainer: ManifestElement;
    ELEMENT_DATA: ManifestElement[];
    dataSource: MatTableDataSource<ManifestElement>;

    displayedColumns: string[] = ['status', 'containerID', 'content', 'location', 'type', 'weight', 'size', 'DG', 'arrival', 'sender'];


    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private ContainerService: ContainerService, public dialog: MatDialog) {
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        console.log(1);
    }

    // Change value to toggle between containers and items
    public onValChange(val: string) {
        this.toggleValue = val;
    }

    applyFilter(filterValue: string) {
        //const filterValue=(event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        console.log(3)
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    
    ngOnInit() {
        // Initial displayed table
        this.toggleValue = 'containers';

        //Count items on the rig
        this.countBaskets();
        this.countContainers();
        this.countItems();

        
        //this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getManifest();

    }
    onSelect(Container: ManifestElement): void {
        this.selectedContainer = Container;
    }

    getManifest() {
        this.ContainerService.getManifest()
            .subscribe(Manifest => this.ELEMENT_DATA = Manifest);
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        console.log(2);
    }
    openDialog(): void {
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            width: '750px',
            height:'321px',
            data: { name: this.name, func:this.applyFilter ,dataSource:this.dataSource}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.name = result;
        });
    }
    // Counts all containers from items in "database/file"
    private countContainers(): void{
        this.containers = 14;
    }
    // Counts all baskets from items in "database/file"
    private countBaskets(): void{
        this.baskests = 10;
    }
    // Counts all items from items in "database/file"
    private countItems(): void{
        this.items = 289;
    }
  
}

