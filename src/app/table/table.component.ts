import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { ContainerService } from '../container.service';
import { ManifestElement } from '../container';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  selectedContainer:ManifestElement;
  ELEMENT_DATA: ManifestElement[];
  displayedColumns: string[] = ['id', 'containerID', 'content', 'location'];
  selection = new SelectionModel<ManifestElement>(true, []);
  constructor(private ContainerService: ContainerService,) { }
  

  ngOnInit() {
    this.getManifest();
  }
  onSelect(Container:ManifestElement): void {
    this.selectedContainer =Container ;
  }

  getManifest() {
    this.ContainerService.getManifest()
        .subscribe(Manifest => this.ELEMENT_DATA=Manifest);
  
  }
}