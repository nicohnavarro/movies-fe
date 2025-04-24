import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from '../models/movie.model';
import { MockMovies } from './mock-movies';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) {}

  // Future real API call
  // getMovies(): Observable<any[]> {
  //   return this.http.get<any[]>('/api/movies');
  // }

  // For now: mock data
 getMovies(): Observable<Partial<Movie>[]> {
  return of(MockMovies);
}
}