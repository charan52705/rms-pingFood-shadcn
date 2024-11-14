

import { Injectable } from '@angular/core';
import axios from 'axios';  
import { Observable, from, of } from 'rxjs'; 
import { catchError } from 'rxjs/operators';


export interface Item {
  itemName: string;
  itemDescription: string;
  itemPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  
  private apiUrl = 'https:/api/items'

  constructor() { }

  
  getItems(): Observable<Item[]> {
    return from(axios.get<Item[]>(this.apiUrl).then(response => response.data))
      .pipe(
        catchError(this.handleError<Item[]>('getItems', []))
      );
  }

  
  addItem(item: Item): Observable<Item> {
    return from(axios.post<Item>(this.apiUrl, item).then(response => response.data))
      .pipe(
        catchError(this.handleError<Item>('addItem'))
      );
  }

  
  updateItem(item: Item): Observable<Item> {
    return from(axios.put<Item>(`${this.apiUrl}/${item.itemName}`, item).then(response => response.data))
      .pipe(
        catchError(this.handleError<Item>('updateItem'))
      );
  }

  
  deleteItem(itemName: string): Observable<{}> {
    return from(axios.delete(`${this.apiUrl}/${itemName}`).then(() => ({})))
      .pipe(
        catchError(this.handleError<{}>('deleteItem'))
      );
  }

  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T); 
    };
  }
}
