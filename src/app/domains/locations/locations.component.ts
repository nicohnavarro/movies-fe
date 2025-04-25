import { Component, OnInit, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SidebarSearchComponent } from './sidebar-search/sidebar-search.component';
import { DynamicMapComponent } from './dynamic-map/dynamic-map.component';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [
    CommonModule, 
    SidebarSearchComponent, 
    DynamicMapComponent,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  @ViewChild(SidebarSearchComponent) sidebarSearch!: SidebarSearchComponent;
  
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  selectedMovie: Movie | null = null;
  isSidebarCollapsed = false;
  isSearching = false;
  
  // Pagination state
  pageSize = 10;
  pageSizeOptions = [10, 25, 50];
  totalCount = 0;
  currentPage = 0;
  isLoading = false;

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  constructor(
    private movieService: MovieService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(page: number = 0): void {
    this.isLoading = true;
    this.currentPage = page;
    this.movieService.getPaginatedMovies(page + 1, this.pageSize).subscribe({
      next: (response) => {
        this.movies = response.movies;
        this.filteredMovies = [...response.movies];
        this.totalCount = response.totalCount;
        this.isLoading = false;
        // Scroll to top only in browser
        if (isPlatformBrowser(this.platformId)) {
          const sidebar = document.querySelector('.sidebar-content');
          if (sidebar) {
            sidebar.scrollTop = 0;
          }
        }
      },
      error: (error) => {
        console.error('Error loading movies:', error);
        this.movies = [];
        this.filteredMovies = [];
        this.isLoading = false;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.loadMovies(event.pageIndex);
    this.selectedMovie = null;
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.loadMovies(this.currentPage + 1);
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 0) {
      this.loadMovies(this.currentPage - 1);
    }
  }

  onMovieSelected(movie: Movie) {
    this.selectedMovie = movie;
  }

  onMoviesFiltered(filteredMovies: Movie[]) {
    this.filteredMovies = [...filteredMovies];
  }

  onTotalCountChanged(totalCount: number) {
    this.totalCount = totalCount;
    this.currentPage = 0; // Resetear a la primera página
  }

  onSearchStateChanged(isSearching: boolean) {
    this.isSearching = isSearching;
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}