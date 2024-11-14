import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


export interface FindHotel {
  id: number;
  name: string;
  description: string;
  price: number;
  location: string;
  imageUrl: string;
}



@Injectable({
  providedIn: 'root',
})
export class FindHotelService {
  private apiUrl = 'https:/api/hotels'; // API URL for hotel items

  constructor() {}

  // Get all hotels
  getHotels(): Observable<FindHotel[]> {
    return from(
      axios.get<FindHotel[]>(this.apiUrl).then((response) => response.data)
    ).pipe(catchError(this.handleError<FindHotel[]>('getHotels', [])));
  }

  // Search for hotels by location or name
  searchHotels(query: string): Observable<FindHotel[]> {
    return from(
      axios
        .get<FindHotel[]>(`${this.apiUrl}/search`, { params: { query } })
        .then((response) => response.data)
    ).pipe(catchError(this.handleError<FindHotel[]>('searchHotels', [])));
  }

  // Handle HTTP errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
