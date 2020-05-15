// Default imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import {OverlayModule} from '@angular/cdk/overlay';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule,} from '@angular/material/form-field'
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';

/*Material mwc component*/

/*Components to link in the menu-bar, each component represents the content below the top menu-bar */
import { InventoryComponent } from './inventory/inventory.component';
import { ManifestComponent } from './manifest/manifest.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MapComponent } from './map/map.component';
import { TableComponent } from './table/table.component';
import {MatTableModule} from '@angular/material/table';
import {SidebarComponent} from './sidebar/sidebar.component';
import { MqttComponent } from './mqtt/mqtt.component';
import { ExampletableComponent } from './exampletable/exampletable.component';
import { DialogOverviewExampleDialog } from './table/dialog-overview-example-dialog';
// MQTT imports and settings
import { MqttModule, IMqttServiceOptions } from 'ngx-mqtt';
export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'localhost',
  port: 9001,
  path: '/mqtt'
};

// Others
import { SidebarModule } from 'ng-sidebar';
import { ItemTableComponent } from './item-table/item-table.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    ManifestComponent,
    NavbarComponent,
    MapComponent,
    TableComponent,
    MqttComponent,
    ExampletableComponent,
    SidebarComponent,
    DialogOverviewExampleDialog,
    ItemTableComponent,
    HomeComponent,
    
  ],
  imports: [
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
    HttpClientModule,
    SidebarModule.forRoot(),
    MatDialogModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatTooltipModule
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
