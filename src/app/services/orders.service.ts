import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, of } from 'rxjs';


export interface Order {
  id: number;
  customerName: string;
  orderDate: string;  // YYYY-MM-DD
  orderTotal: number;
  orderStatus: string;  // E.g., 'Pending', 'Shipped', 'Delivered'
  items: Array<{ productId: number, productName: string, quantity: number, price: number }>;
}


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'https://your-api-endpoint.com/orders'; // Replace with your actual API URL

  constructor() { }

  // Get all orders (GET request)
  getOrders(): Observable<Order[]> {
    return new Observable((observer) => {
      axios.get(this.apiUrl)
        .then(response => {
          observer.next(response.data); // Assuming the response is in 'data'
          observer.complete();
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
          observer.error('Error fetching orders');
        });
    });
  }

  // Create a new order (POST request)
  createOrder(order: Order): Observable<Order> {
    return new Observable((observer) => {
      axios.post(this.apiUrl, order)
        .then(response => {
          observer.next(response.data); // Assuming the response contains the created order
          observer.complete();
        })
        .catch(error => {
          console.error('Error creating order:', error);
          observer.error('Error creating order');
        });
    });
  }

  // Update an existing order (PUT request)
  updateOrder(updatedOrder: Order): Observable<Order> {
    return new Observable((observer) => {
      axios.put(`${this.apiUrl}/${updatedOrder.id}`, updatedOrder)
        .then(response => {
          observer.next(response.data); // Assuming the response contains the updated order
          observer.complete();
        })
        .catch(error => {
          console.error('Error updating order:', error);
          observer.error('Error updating order');
        });
    });
  }

  // Delete an order (DELETE request)
  deleteOrder(id: number): Observable<void> {
    return new Observable((observer) => {
      axios.delete(`${this.apiUrl}/${id}`)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch(error => {
          console.error('Error deleting order:', error);
          observer.error('Error deleting order');
        });
    });
  }
}
