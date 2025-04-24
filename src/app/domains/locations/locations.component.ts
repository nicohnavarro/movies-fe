import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { SidebarSearchComponent } from './sidebar-search/sidebar-search.component';

@Component({
  selector: 'app-locations',
  imports: [SidebarSearchComponent],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss'
})
export class LocationsComponent {
constructor(private movieService: MovieService) {}
movies: Partial<Movie>[] = [];

ngOnInit(): void {
  this.movieService.getMovies().subscribe(data => {
    this.movies = data;
    console.log(this.movies)
  });
}
}
