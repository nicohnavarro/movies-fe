import { Routes } from '@angular/router';
import { MovieMapComponent } from './domains/movie-map/movie-map.component';
import { LocationsComponent } from './domains/locations/locations.component';

export const routes: Routes = [
      {
    path: '',
    component: LocationsComponent, 
  },
  {
    path: 'map',
    component: MovieMapComponent, 
  },
];