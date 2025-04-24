import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieMapComponent } from './movie-map/movie-map.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MovieMapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sf-movie-map';
}
