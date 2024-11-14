import { Injectable } from '@angular/core';
import axios from 'axios';  
import { Observable, from, of } from 'rxjs'; 
import { catchError } from 'rxjs/operators';


export interface Unit {
  UnitName: string;
  UnitDescription: string;
  UnitPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  private apiUrl = 'https:/api/Units'

  constructor() { }

  
  getUnits(): Observable<Unit[]> {
    return from(axios.get<Unit[]>(this.apiUrl).then(response => response.data))
      .pipe(
        catchError(this.handleError<Unit[]>('getUnits', []))
      );
  }

  
  addUnit(Unit: Unit): Observable<Unit> {
    return from(axios.post<Unit>(this.apiUrl, Unit).then(response => response.data))
      .pipe(
        catchError(this.handleError<Unit>('addUnit'))
      );
  }

  
  updateUnit(Unit: Unit): Observable<Unit> {
    return from(axios.put<Unit>(`${this.apiUrl}/${Unit.UnitName}`, Unit).then(response => response.data))
      .pipe(
        catchError(this.handleError<Unit>('updateUnit'))
      );
  }

  
  deleteUnit(UnitName: string): Observable<{}> {
    return from(axios.delete(`${this.apiUrl}/${UnitName}`).then(() => ({})))
      .pipe(
        catchError(this.handleError<{}>('deleteUnit'))
      );
  }

  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T); 
    };
  }
}
