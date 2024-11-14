import { Injectable } from '@angular/core';
import axios from 'axios';  
import { Observable, from, of } from 'rxjs'; 
import { catchError } from 'rxjs/operators';


export interface Restaurant {
  RestaurantName: string;
  RestaurantDescription: string;
  RestaurantPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private apiUrl = 'https:/api/Restaurants'

  constructor() { }

  
  getRestaurants(): Observable<Restaurant[]> {
    return from(axios.get<Restaurant[]>(this.apiUrl).then(response => response.data))
      .pipe(
        catchError(this.handleError<Restaurant[]>('getRestaurants', []))
      );
  }

  
  addRestaurant(Restaurant: Restaurant): Observable<Restaurant> {
    return from(axios.post<Restaurant>(this.apiUrl, Restaurant).then(response => response.data))
      .pipe(
        catchError(this.handleError<Restaurant>('addRestaurant'))
      );
  }

  
  updateRestaurant(Restaurant: Restaurant): Observable<Restaurant> {
    return from(axios.put<Restaurant>(`${this.apiUrl}/${Restaurant.RestaurantName}`, Restaurant).then(response => response.data))
      .pipe(
        catchError(this.handleError<Restaurant>('updateRestaurant'))
      );
  }

  
  deleteRestaurant(RestaurantName: string): Observable<{}> {
    return from(axios.delete(`${this.apiUrl}/${RestaurantName}`).then(() => ({})))
      .pipe(
        catchError(this.handleError<{}>('deleteRestaurant'))
      );
  }

  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T); 
    };
  }
}
