import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";


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
import {OverlayModule} from '@angular/cdk/overlay';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule,} from '@angular/material/form-field'
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {HttpClientModule} from '@angular/common/http';

/*Components to link in the menu-bar, each component represents the content below the top menu-bar */
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ManifestComponent } from './manifest/manifest.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MapComponent } from './map/map.component';
import { TableComponent } from './table/table.component';
import {MatTableModule} from '@angular/material/table';

import { MqttComponent } from './mqtt/mqtt.component';

// MQTT imports and settings
import { MqttModule, IMqttServiceOptions } from 'ngx-mqtt';
export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'localhost',
  port: 9001,
  path: '/mqtt'
};

import { MatSort, MatSortModule } from '@angular/material/sort';
import { ExampletableComponent } from './exampletable/exampletable.component';
import { MatPaginatorModule } from '@angular/material/paginator';

//Import for sidebar
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarModule } from 'ng-sidebar';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    InventoryComponent,
    ManifestComponent,
    NavbarComponent,
    MapComponent,
    TableComponent,
    MqttComponent,
    ExampletableComponent,
    SidebarComponent

  ],
  imports: [
    SidebarModule.forRoot(),
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    HttpClientModule
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
