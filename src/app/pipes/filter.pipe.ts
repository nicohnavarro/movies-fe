import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../models/movie.model';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(movies: Movie[], predicate: (movie: Movie) => boolean): Movie[] {
    return movies.filter(predicate);
  }
} 