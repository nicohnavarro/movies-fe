import { Component, OnInit, ViewChild, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GoogleMapsModule, MapInfoWindow } from '@angular/google-maps';
import { debounceTime } from 'rxjs/operators';
import Fuse from 'fuse.js';
import { CommonModule } from '@angular/common';
import { MockMovies } from '../../services/mock-movies';

@Component({
  standalone: true,
  selector: 'app-movie-map',
  templateUrl: './movie-map.component.html',
  styleUrls: ['./movie-map.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class MovieMapComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  searchControl = new FormControl('');
  mapCenter = { lat: 37.7749, lng: -122.4194 };
  zoom = 13;
  softDarkMapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#2c2c2c' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#2c2c2c' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#a8a8a8' }] },
    { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#4f4f4f' }] },
    { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#383838' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#484848' }] },
    { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#5c5c5c' }] },
    { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#6c6c6c' }] },
    { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#505050' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#2b3e50' }] },
  ];
  selectedMovie: any = null;
  filteredMovies = signal<any[]>([]);

mapOptions = {
  styles: this.softDarkMapStyle,
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false
};

  allMovies = MockMovies

  private fuse!: Fuse<any>;

  ngOnInit() {
    this.fuse = new Fuse(this.allMovies, {
      keys: ['title', 'location', 'neighborhood'],
      threshold: 0.3,
    });

    this.filteredMovies.set(this.allMovies);

    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(query => {
      if (query && query.length >= 3) {
        const results = this.fuse.search(query);
        this.filteredMovies.set(results.map(r => r.item));
      } else {
        this.filteredMovies.set(this.allMovies);
      }
    });
  }

  openInfo(movie: any) {
    this.selectedMovie = movie;
    if (this.infoWindow) {
      this.infoWindow.open();
    }
  }

  selectMovie(movie: any) {
    this.mapCenter = { lat: movie.lat, lng: movie.lng };
    this.openInfo(movie);
  }

  getCustomMarkerIcon(movie: any): google.maps.Symbol | string {
    if (!isPlatformBrowser(this.platformId) || typeof google === 'undefined' || !google.maps) {
      return '';
    }

    const isSelected = this.selectedMovie?.title === movie.title;
    return {
      path: google.maps.SymbolPath.CIRCLE,
      scale: isSelected ? 10 : 6,
      fillColor: isSelected ? '#00BCD4' : '#2196F3',
      fillOpacity: 1,
      strokeWeight: 1,
    };
  }


}