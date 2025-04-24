import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import Fuse from 'fuse.js';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Movie } from '../../../models/movie.model';

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
  styleUrls: ['./sidebar-search.component.scss'],
})
export class SidebarSearchComponent implements OnInit {
@Input() movies: Partial<Movie>[] = [];

  searchControl = new FormControl('');
  filteredMovies = signal< Partial<Movie>[]>([]);
  private fuse!: Fuse< Partial<Movie>>;

  ngOnInit(): void {
    this.fuse = new Fuse(this.movies, {
      keys: ['title', 'locations', 'analysis_neighborhood'],
      threshold: 0.3,
    });

    this.filteredMovies.set(this.movies);

    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(query => {
      if (query && query.length >= 3) {
        const results = this.fuse.search(query);
        this.filteredMovies.set(results.map(r => r.item));
      } else {
        this.filteredMovies.set(this.movies);
      }
    });
  }
}