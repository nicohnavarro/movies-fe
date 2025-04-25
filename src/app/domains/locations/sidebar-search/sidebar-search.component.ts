import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Movie } from '../../../models/movie.model';
import { MovieService } from '../../../services/movie.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-sidebar-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './sidebar-search.component.html',
  styleUrls: ['./sidebar-search.component.scss']
})
export class SidebarSearchComponent implements OnInit, OnChanges {
  @Input() movies: Movie[] = [];
  @Input() selectedMovie: Movie | null = null;
  @Output() movieClicked = new EventEmitter<Movie>();
  @Output() moviesFiltered = new EventEmitter<Movie[]>();
  @Output() totalCountChanged = new EventEmitter<number>();
  @Output() searchStateChanged = new EventEmitter<boolean>();

  searchControl = new FormControl('');
  filteredMovies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.setupSearch();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movies'] && !this.searchControl.value) {
      this.filteredMovies = this.movies;
      this.moviesFiltered.emit(this.filteredMovies);
    }
  }

  private setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(term => {
        const isSearching = Boolean(term && term.length >= 3);
        this.searchStateChanged.emit(isSearching);
        
        if (isSearching && term) {
          this.movieService.searchMovies(term).subscribe(response => {
            this.filteredMovies = response.movies;
            this.moviesFiltered.emit(this.filteredMovies);
            this.totalCountChanged.emit(response.totalCount);
          });
        } else if (!term) {
          this.filteredMovies = this.movies;
          this.moviesFiltered.emit(this.filteredMovies);
        }
      });
  }

  onClickMovie(movie: Movie): void {
    this.movieClicked.emit(movie);
  }
}