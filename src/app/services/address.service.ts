// src/app/services/address.service.ts

import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// src/app/models/address.model.ts
export interface Address {
  id: number;
  name: string;
  doorno: string;
  street_no: string;
  landmark: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'http://localhost:8000'; // Replace with your API base URL

  constructor() {}

  // Convert Axios Promise to Observable
  private axiosToObservable(promise: Promise<any>): Observable<any> {
    return from(promise).pipe(
      catchError(error => {
        throw error; // Forward error to the subscriber
      })
    );
  }

  // Create a new address
  createAddress(address: Address): Observable<any> {
    const promise = axios.post(`${this.apiUrl}/create-address/`, address);
    return this.axiosToObservable(promise);
  }

  // Get address by id
  getAddress(addressId: number): Observable<Address> {
    const promise = axios.get(`${this.apiUrl}/address/${addressId}`);
    return this.axiosToObservable(promise);
  }

  // Update an address
  updateAddress(addressId: number, address: Address): Observable<any> {
    const promise = axios.put(`${this.apiUrl}/address/${addressId}`, address);
    return this.axiosToObservable(promise);
  }

  // Delete an address
  deleteAddress(addressId: number): Observable<any> {
    const promise = axios.delete(`${this.apiUrl}/address/${addressId}`);
    return this.axiosToObservable(promise);
  }

  // Get all addresses
  getAllAddresses(): Observable<Address[]> {
    const promise = axios.get(`${this.apiUrl}/addresses/`);
    return this.axiosToObservable(promise).pipe(
      map((data: Address[]) => data) // Optional: Add any data transformation here
    );
  }
}
