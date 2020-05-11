import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public opened = false;
  @Input() name: string;

  constructor() { }

  ngOnInit(): void {
  }

  public toggleSidebar() {
    this.opened = !this.opened;
  }

}
