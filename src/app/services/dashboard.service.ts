import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, of } from 'rxjs';


interface Order {
  id: string;
  status: string;
  estimatedDelivery: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'https:'

  constructor() { }

  
  getOrders(): Observable<Order[]> {
    
    return new Observable(observer => {
      axios.get(this.apiUrl)
        .then(response => {
          const orders: Order[] = response.data; 
          observer.next(orders);
          observer.complete();
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
          observer.error(error); 
        });
    });
  }

  
  createOrder(order: Order): Observable<Order> {
    return new Observable(observer => {
      axios.post(this.apiUrl, order)
        .then(response => {
          observer.next(response.data); 
          observer.complete();
        })
        .catch(error => {
          console.error('Error creating order:', error);
          observer.error(error); 
        });
    });
  }
}
