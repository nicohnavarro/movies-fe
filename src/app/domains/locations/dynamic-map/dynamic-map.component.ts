import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule, MapInfoWindow } from '@angular/google-maps';
import { Movie } from '../../../models/movie.model';

@Component({
  selector: 'app-dynamic-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './dynamic-map.component.html',
  styleUrls: ['./dynamic-map.component.scss'],
})
export class DynamicMapComponent implements OnChanges {
  @Input() movies: Movie[] = [];
  @Input() selectedMovie: Movie | null = null;
  @Output() movieSelected = new EventEmitter<Movie>();

  @ViewChild('infoWindow') infoWindow!: MapInfoWindow;

  initPointSF = { lat: 37.7749, lng: -122.4194 };
  mapCenter = this.initPointSF;
  zoom = 13;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedMovie']?.currentValue) {
      const movie = changes['selectedMovie'].currentValue as Movie;
      this.mapCenter = { lat: movie.lat!, lng: movie.lng! };
      setTimeout(() => this.infoWindow?.open(), 0);
    }
  }

  selectMovie(movie: Movie) {
    this.movieSelected.emit(movie);
  }

  getMarkerIcon(movie: Movie): google.maps.Icon  {
    return this.selectedMovie?.title === movie.title
      ? { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }
      : { url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' };
  }
}