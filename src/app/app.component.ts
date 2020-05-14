import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'maenford-app';
   _opened: boolean = false;
   _toggleSidebar() {
    this._opened = !this._opened;
  }
}
