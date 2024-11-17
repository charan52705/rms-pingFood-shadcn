import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

export interface Restaurant {
  restaurants_id: number;
  res_name: string;
  res_email: string;
  res_website: string;
  res_desc: string;
  res_added: string;
  res_active: boolean;
  city_id: string;
  state_id: string;
  price: number; 
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private apiUrl = 'http://localhost:8000/';  // Your backend API URL
  private axiosInstance: AxiosInstance;

  constructor() {
    // Create an Axios instance with default settings
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Fetch all restaurants.
   * @returns An observable with the list of restaurants.
   */
  getAllRestaurants(): Observable<Restaurant[]> {
    return new Observable((observer) => {
      this.axiosInstance.get('/restaurants')
        .then((response: AxiosResponse<Restaurant[]>) => {
          observer.next(response.data);  // Emit the response data (restaurant list)
          observer.complete();  // Mark the observable as complete
        })
        .catch((error) => {
          console.error('Error fetching restaurants:', error);
          observer.error(error);  // If error occurs, propagate it
        });
    });
  }

  /**
   * Create a new restaurant.
   * @param restaurant The restaurant data to create.
   * @returns An observable with the server response.
   */
  createRestaurant(restaurant: Restaurant): Observable<any> {
    return new Observable((observer) => {
      this.axiosInstance.post('/create-restaurants', restaurant)
        .then((response: AxiosResponse) => {
          observer.next(response.data);  // Emit the server response data
          observer.complete();  // Mark the observable as complete
        })
        .catch((error) => {
          console.error('Error creating restaurant:', error);
          observer.error(error);  // Propagate any error
        });
    });
  }

  /**
   * Update an existing restaurant.
   * @param restaurant_id The ID of the restaurant to update.
   * @param restaurant The updated restaurant data.
   * @returns An observable with the server response.
   */
  updateRestaurant(restaurant_id: number, restaurant: Restaurant): Observable<any> {
    return new Observable((observer) => {
      this.axiosInstance.put(`/${restaurant_id}`, restaurant)
        .then((response: AxiosResponse) => {
          observer.next(response.data);  // Emit the server response data
          observer.complete();  // Mark the observable as complete
        })
        .catch((error) => {
          console.error('Error updating restaurant:', error);
          observer.error(error);  // Propagate any error
        });
    });
  }

  /**
   * Delete a restaurant.
   * @param restaurant_id The ID of the restaurant to delete.
   * @returns An observable with the server response.
   */
  deleteRestaurant(restaurant_id: number): Observable<any> {
    return new Observable((observer) => {
      this.axiosInstance.delete(`/${restaurant_id}`)
        .then((response: AxiosResponse) => {
          observer.next(response.data);  // Emit the server response data
          observer.complete();  // Mark the observable as complete
        })
        .catch((error) => {
          console.error('Error deleting restaurant:', error);
          observer.error(error);  // Propagate any error
        });
    });
  }
}
