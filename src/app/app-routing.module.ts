import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { RequestsComponent } from './requests/requests.component';
import { BackloadComponent } from './backload/backload.component';
import { LoadoutComponent } from './loadout/loadout.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'requests', component: RequestsComponent },
  { path: 'backload', component: BackloadComponent },
  { path: 'loadout', component: LoadoutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
