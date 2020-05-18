import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
    showFiller = false;
    mode = new FormControl('over');

  constructor() { }

  ngOnInit(): void {
  }

  switchTable(): void{
    // todo
    console.log('Table switched');
  }

}
