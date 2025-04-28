import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnChanges,
  SimpleChanges,
  QueryList,
  ViewChildren,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Movie } from '../../../models/movie.model';
import { FilterPipe } from '../../../pipes/filter.pipe';

@Component({
  selector: 'app-dynamic-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, FilterPipe],
  templateUrl: './dynamic-map.component.html',
  styleUrls: ['./dynamic-map.component.scss'],
})
export class DynamicMapComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() movies: Movie[] = [];
  @Input() selectedMovie: Movie | null = null;
  @Output() movieSelected = new EventEmitter<Movie>();

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChildren(MapMarker) markers!: QueryList<MapMarker>;

  initPointSF = { lat: 37.7749, lng: -122.4194 };
  mapCenter = this.initPointSF;
  zoom = 13;

  private isValidCoordinate(value: number | undefined | null): boolean {
    return value !== undefined && value !== null && !isNaN(value);
  }

  getValidCoordinates(movie: Movie): { lat: number; lng: number } | null {
    if (this.isValidCoordinate(movie.latitude) && this.isValidCoordinate(movie.longitude)) {
      return { lat: movie.latitude!, lng: movie.longitude! };
    }
    return null;
  }

  ngOnInit() {
    if (this.selectedMovie) {
      const coords = this.getValidCoordinates(this.selectedMovie);
      if (coords) {
        this.mapCenter = coords;
      }
    }
  }

  ngAfterViewInit() {
    if (this.selectedMovie) {
      this.tryOpenInfoWindow();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedMovie']?.currentValue) {
      const movie = changes['selectedMovie'].currentValue as Movie;
      const coords = this.getValidCoordinates(movie);
      if (coords) {
        this.mapCenter = coords;
        this.tryOpenInfoWindow();
      }
    }
  }

  private tryOpenInfoWindow() {
    const attempts = 5;
    let attempt = 0;

    const tryOpen = () => {
      if (attempt >= attempts) return;

      if (this.markers && this.selectedMovie) {
        const index = this.movies.findIndex(m => 
          m.latitude === this.selectedMovie!.latitude && 
          m.longitude === this.selectedMovie!.longitude
        );
        if (index >= 0) {
          const marker = this.markers.get(index);
          if (marker) {
            this.openInfoWindow(marker, this.selectedMovie);
            return;
          }
        }
      }

      attempt++;
      setTimeout(tryOpen, 200);
    };

    setTimeout(tryOpen, 100);
  }

  openInfoWindow(marker: MapMarker, movie: Movie) {
    this.movieSelected.emit(movie);
    this.infoWindow.open(marker);
  }

  hasValidCoordinates(movie: Movie): boolean {
    return !!(movie.latitude && movie.longitude);
  }

  getMarkerPosition(movie: Movie): { lat: number; lng: number } {
    return this.hasValidCoordinates(movie) 
      ? { lat: movie.latitude!, lng: movie.longitude! }
      : this.initPointSF;
  }

  getMarkerIcon(movie: Movie): google.maps.Icon  {
    return this.selectedMovie?.latitude === movie.latitude && 
           this.selectedMovie?.longitude === movie.longitude
      ? { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }
      : { url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' };
  }
}