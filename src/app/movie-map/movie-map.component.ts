import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { MapInfoWindow } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-movie-map',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMapsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './movie-map.component.html',
  styleUrls: ['./movie-map.component.scss'],
})
export class MovieMapComponent implements OnInit {
  searchControl = new FormControl('');
  mapCenter = { lat: 37.7749, lng: -122.4194 }; // San Francisco
  zoom = 12;

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  selectedMovie: any = null;

allMovies = [
  {
    title: 'Cardinal X',
    releaseYear: 2015,
    location: '100 Alemany Blvd.',
    funFacts: '',
    productionCompany: 'Fire Horse Film Productions LLC',
    distributor: '',
    director: 'Annie Wang',
    writer: 'Annie Wang',
    actors: ['Annie Q', 'Francesca Eastwood', 'Pierson Fode'],
    lat: 37.7357632,
    lng: -122.4098934,
    neighborhood: 'Bernal Heights',
  },
  {
    title: 'The Matrix Resurrections',
    releaseYear: 2021,
    location: 'Montgomery between Washington and Bush',
    funFacts: '',
    productionCompany: 'Adobe Pictures, Inc.',
    distributor: 'Warner Brothers',
    director: 'Lana Wachowski',
    writer: 'Lana Wachowski, David Mitchell, Aleksander Hemon',
    actors: ['Keanu Reeves', 'Keanu Reeves', 'Neil Patrick Harris'],
    lat: 37.7951751,
    lng: -122.4036498,
    neighborhood: 'Chinatown',
  },
  {
    title: '24 Hours on Craigslist',
    releaseYear: 2005,
    location: 'Unknown',
    funFacts: '',
    productionCompany: 'Yerba Buena Productions',
    distributor: 'Zealot Pictures',
    director: 'Michael Ferris Gibson',
    writer: 'N/A',
    actors: ['Craig Newmark'],
    lat: 37.7749,
    lng: -122.4194,
    neighborhood: 'San Francisco',
  }
];

  filteredMovies = signal<any[]>([]);
  private fuse!: Fuse<any>;

  ngOnInit() {
    this.fuse = new Fuse(this.allMovies, {
      keys: ['title', 'location'],
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
    this.infoWindow.open();
  }
softDarkMapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#2c2c2c' }]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#2c2c2c' }]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#a8a8a8' }]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ color: '#4f4f4f' }]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#383838' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#484848' }]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{ color: '#5c5c5c' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#6c6c6c' }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#505050' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#2b3e50' }]
  }
];
    mapOptions = {
  styles: this.softDarkMapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};
}