import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Menu {
  name: string;
  description: string;
  price: number;
  category: string;  // Added a category field for illustration
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrl = 'https:/api/Menu';  // Assuming the API for Menu

  constructor() { }

  // Get all menu items
  getMenuItems(): Observable<Menu[]> {
    return from(axios.get<Menu[]>(this.apiUrl).then(response => response.data))
      .pipe(
        catchError(this.handleError<Menu[]>('getMenuItems', []))
      );
  }

  // Add a new menu item
  addMenuItem(menu: Menu): Observable<Menu> {
    return from(axios.post<Menu>(this.apiUrl, menu).then(response => response.data))
      .pipe(
        catchError(this.handleError<Menu>('addMenuItem'))
      );
  }

  // Update an existing menu item
  updateMenuItem(menu: Menu): Observable<Menu> {
    return from(axios.put<Menu>(`${this.apiUrl}/${menu.name}`, menu).then(response => response.data))
      .pipe(
        catchError(this.handleError<Menu>('updateMenuItem'))
      );
  }

  // Delete a menu item by name
  deleteMenuItem(name: string): Observable<{}> {
    return from(axios.delete(`${this.apiUrl}/${name}`).then(() => ({})))
      .pipe(
        catchError(this.handleError<{}>('deleteMenuItem'))
      );
  }

  // Error handling function
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
