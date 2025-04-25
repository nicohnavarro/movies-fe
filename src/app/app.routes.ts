import { Routes } from '@angular/router';
import { HomeComponent } from './domains/home/home.component';
import { LocationsComponent } from './domains/locations/locations.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  }, {
    path: 'v1',
    component: LocationsComponent,
  }
];