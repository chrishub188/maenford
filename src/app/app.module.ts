/*Default imports*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*Material design UI elements */
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule,} from '@angular/material/form-field'
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

/*Components to link in the menu-bar, each component represents the content below the top menu-bar */
import { InventoryComponent } from './inventory/inventory.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MapComponent } from './map/map.component';
//import { TableComponent } from './table/table.component';
import {MatTableModule} from '@angular/material/table';
import { MqttComponent } from './mqtt/mqtt.component';
import { DialogOverviewExampleDialog } from './containertable/dialog-overview-example-dialog';
import {MatTreeModule} from '@angular/material/tree'; 
import { RequestsComponent } from './requests/requests.component';
import { BackloadComponent } from './backload/backload.component';
import { LoadoutComponent } from './loadout/loadout.component';
import { MaptableComponent } from './maptable/maptable.component';
import { ItemtableComponent } from './itemtable/itemtable.component';


/* MQTT imports and settings */
import { MqttModule, IMqttServiceOptions } from 'ngx-mqtt';
import { ContainertableComponent } from './containertable/containertable.component';
export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'localhost',
  port: 9001,
  path: '/mqtt'
};


@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    NavbarComponent,
    MapComponent,
    //TableComponent,
    MqttComponent,
    DialogOverviewExampleDialog,
    RequestsComponent,
    BackloadComponent,
    LoadoutComponent,
    MaptableComponent,
    ItemtableComponent,
    ContainertableComponent,
  ],
  imports: [
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatDividerModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSortModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatTooltipModule,
    MatTreeModule,
    MatSlideToggleModule
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
