import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Movie } from '../models/movie.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = `${environment.apiUrl}/api/GetMovies?code=${environment.apiKey}`;

  constructor(private http: HttpClient) {}

  getMovies(): Observable<{ totalRecords: number; movies: Movie[] }> {
    return this.http.get<{ totalRecords: number; movies: Movie[] }>(`https://${this.apiUrl}`).pipe(
      map(response => ({
        totalRecords: response.totalRecords,
        movies: response.movies.filter(movie => movie.latitude !== null && movie.longitude !== null)
      }))
    );
  }
}