import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';



export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}


@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private apiUrl = 'https:/api/addresses'; // Replace with your API URL

  constructor() {}

  // Get all addresses
  getAddresses(): Observable<Address[]> {
    return from(
      axios.get<Address[]>(this.apiUrl).then((response) => response.data)
    ).pipe(
      catchError(this.handleError<Address[]>('getAddresses', []))
    );
  }

  // Add a new address
  addAddress(address: Address): Observable<Address> {
    return from(
      axios.post<Address>(this.apiUrl, address).then((response) => response.data)
    ).pipe(
      catchError(this.handleError<Address>('addAddress'))
    );
  }

  // Update an existing address
  updateAddress(address: Address): Observable<Address> {
    return from(
      axios.put<Address>(`${this.apiUrl}/${address.street}`, address).then(
        (response) => response.data
      )
    ).pipe(
      catchError(this.handleError<Address>('updateAddress'))
    );
  }

  // Delete an address by street name (or unique identifier)
  deleteAddress(street: string): Observable<{}> {
    return from(
      axios.delete(`${this.apiUrl}/${street}`).then(() => ({}))
    ).pipe(
      catchError(this.handleError<{}>('deleteAddress'))
    );
  }

  // Handle HTTP errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T); // Return an empty result for safe handling
    };
  }
}
