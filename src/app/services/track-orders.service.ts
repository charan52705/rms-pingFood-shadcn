import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';


export interface OrderStatus {
  status: string;
  lastUpdated: string;
  shipmentDetails?: string;
}


@Injectable({
  providedIn: 'root'
})
export class TrackPaymentsService {

  private apiUrl = 'https://your-api-endpoint.com';

  constructor() { }

  // Track order by ID
  trackOrder(orderId: string): Observable<OrderStatus> {
    return new Observable((observer) => {
      axios.get(`${this.apiUrl}/orders/${orderId}`)
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error('Error tracking order');
        });
    });
  }

  // Process payment
  processPayment(paymentDetails: any): Observable<any> {
    return new Observable((observer) => {
      axios.post(`${this.apiUrl}/payments`, paymentDetails)
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error('Error processing payment');
        });
    });
  }
}
