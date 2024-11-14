import { Injectable } from '@angular/core';
import axios from 'axios';  
import { Observable } from 'rxjs';



export interface Customer {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
}


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = ''

  constructor() { }

  
  getCustomers(): Observable<Customer[]> {
    return new Observable((observer) => {
      axios.get(this.apiUrl)
        .then(response => {
          observer.next(response.data); 
          observer.complete();
        })
        .catch(error => {
          console.error('Error fetching customers:', error);
          observer.error('Error fetching customers');
        });
    });
  }

  
  createCustomer(customer: Customer): Observable<Customer> {
    return new Observable((observer) => {
      axios.post(this.apiUrl, customer)
        .then(response => {
          observer.next(response.data); 
          observer.complete();
        })
        .catch(error => {
          console.error('Error creating customer:', error);
          observer.error('Error creating customer');
        });
    });
  }

  
  updateCustomer(updatedCustomer: Customer): Observable<Customer> {
    return new Observable((observer) => {
      axios.put(`${this.apiUrl}/${updatedCustomer.id}`, updatedCustomer)
        .then(response => {
          observer.next(response.data); 
          observer.complete();
        })
        .catch(error => {
          console.error('Error updating customer:', error);
          observer.error('Error updating customer');
        });
    });
  }

  
  deleteCustomer(id: number): Observable<void> {
    return new Observable((observer) => {
      axios.delete(`${this.apiUrl}/${id}`)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch(error => {
          console.error('Error deleting customer:', error);
          observer.error('Error deleting customer');
        });
    });
  }
}
