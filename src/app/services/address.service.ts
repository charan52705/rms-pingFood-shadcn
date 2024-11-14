import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private apiUrl = 'https://your-api-url.com/addresses';  // Replace with your actual API endpoint

  constructor() {}

  // Add new address
  addAddress(addressData: any) {
    return axios.post(this.apiUrl, addressData)
      .then(response => response.data)
      .catch(error => {
        throw this.handleError(error);
      });
  }

  // Update existing address
  updateAddress(addressId: string, addressData: any) {
    return axios.put(`${this.apiUrl}/${addressId}`, addressData)
      .then(response => response.data)
      .catch(error => {
        throw this.handleError(error);
      });
  }

  // Handle errors globally
  private handleError(error: any) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Error Response:', error.response);
      return error.response.data || 'An error occurred!';
    } else if (error.request) {
      // No response was received
      console.error('Error Request:', error.request);
      return 'No response from the server!';
    } else {
      // Something else happened
      console.error('Error:', error.message);
      return error.message || 'An unknown error occurred!';
    }
  }
}
