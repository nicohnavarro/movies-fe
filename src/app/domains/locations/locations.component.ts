import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarSearchComponent } from './sidebar-search/sidebar-search.component';
import { DynamicMapComponent } from './dynamic-map/dynamic-map.component';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule, SidebarSearchComponent, DynamicMapComponent],
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  selectedMovie: Movie | null = null;
  isSidebarCollapsed = false;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data.movies;
      this.filteredMovies = data.movies;
    });
  }

  onMovieSelected(movie: Movie) {
    this.selectedMovie = movie;
  }

  onMoviesFiltered(filteredMovies: Movie[]) {
    this.filteredMovies = filteredMovies;
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}