import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


export interface FindFood {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}


@Injectable({
  providedIn: 'root',
})
export class FindFoodService {
  private apiUrl = 'https:/api/foods'; // API URL for food items

  constructor() {}

  // Get all foods
  getFoods(): Observable<FindFood[]> {
    return from(
      axios.get<FindFood[]>(this.apiUrl).then((response) => response.data)
    ).pipe(catchError(this.handleError<FindFood[]>('getFoods', [])));
  }

  // Search for food items by category or name
  searchFoods(query: string): Observable<FindFood[]> {
    return from(
      axios
        .get<FindFood[]>(`${this.apiUrl}/search`, { params: { query } })
        .then((response) => response.data)
    ).pipe(catchError(this.handleError<FindFood[]>('searchFoods', [])));
  }

  // Handle HTTP errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
