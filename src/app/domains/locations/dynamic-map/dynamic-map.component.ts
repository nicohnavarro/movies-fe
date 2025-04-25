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

@Component({
  selector: 'app-dynamic-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
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

  ngOnInit() {
    if (this.selectedMovie) {
      this.mapCenter = { 
        lat: this.selectedMovie.latitude!, 
        lng: this.selectedMovie.longitude! 
      };
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
      this.mapCenter = { lat: movie.latitude!, lng: movie.longitude! };
      this.tryOpenInfoWindow();
    }
  }

  private tryOpenInfoWindow() {
    const attempts = 5;
    let attempt = 0;

    const tryOpen = () => {
      if (attempt >= attempts) return;

      if (this.markers && this.selectedMovie) {
        const index = this.movies.findIndex(m => m.title === this.selectedMovie!.title);
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

  getMarkerIcon(movie: Movie): google.maps.Icon  {
    return this.selectedMovie?.title === movie.title
      ? { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }
      : { url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' };
  }
}