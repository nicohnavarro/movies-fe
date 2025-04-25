import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Movie } from '../models/movie.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = environment.production 
    ? `https://${environment.apiUrl}/api/v1/movie`
    : `/api/api/v1/movie`;
  private apiCode = 'TjS7VvG0TPUArvIkkhX-PMYOjzUdZtOlLiogWAUgqziOAzFuOdBpaQ==';

  constructor(private http: HttpClient) {}

  private getParams(params?: HttpParams): HttpParams {
    return (params || new HttpParams()).set('code', this.apiCode);
  }

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<{ movies: Movie[] }>(`${this.baseUrl}/all`, { 
      params: this.getParams() 
    }).pipe(
      map(response => response.movies)
    );
  }

  getPaginatedMovies(pageNumber: number = 1, pageSize: number = 10): Observable<{ totalCount: number; movies: Movie[] }> {
    const params = this.getParams(
      new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    );

    return this.http.get<{ totalCount: number; movies: Movie[] }>(`${this.baseUrl}/pag`, { params }).pipe(
      map(response => ({
        totalCount: response.totalCount,
        movies: response.movies
      }))
    );
  }

  searchMovies(term: string, pageNumber: number = 1, pageSize: number = 10): Observable<{ totalCount: number; movies: Movie[] }> {
    const params = this.getParams(
      new HttpParams()
        .set('term', term)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    );
    
    return this.http.get<{ totalCount: number; movies: Movie[] }>(`${this.baseUrl}/search`, { params }).pipe(
      map(response => ({
        totalCount: response.totalCount,
        movies: response.movies
      }))
    );
  }
}