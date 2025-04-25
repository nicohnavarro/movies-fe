import { Routes } from '@angular/router';
import { LocationsComponent } from './domains/locations/locations.component';

export const routes: Routes = [
  {
    path: '',
    component: LocationsComponent,
  }, {
    path: 'v1',
    component: LocationsComponent,
  }
];