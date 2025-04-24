import { Component } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { RouterOutlet } from '@angular/router';
import { LocationsComponent } from './domains/locations/locations.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SharedModule,LocationsComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sf-movie-map';
}
