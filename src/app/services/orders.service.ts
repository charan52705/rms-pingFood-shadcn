

import { Injectable } from '@angular/core';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000'

export interface Order {
  order_id: string;  
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  order_date: string;
  total_price: number;
  order_status: string;
  order_type: string;
  payment_method: string;
  store: {
    store_id: string;
    store_name: string;
    store_address: string;
    store_phone: string;
  };
  items: Array<{
    product_id: number;
    quantity: number;
    price: number;
  }>;
}

@Injectable({
  providedIn: 'root' 
})
export class OrderService {

  
  async getAllOrders(): Promise<Order[]> {
    try {
      const response = await axios.get(`${BASE_URL}/orders/`);
      return response.data; 
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  
  async getOrderById(orderId: string): Promise<Order> {
    try {
      const response = await axios.get(`${BASE_URL}/order/${orderId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order with ID ${orderId}:`, error);
      throw error;
    }
  }

  
  async createOrder(orderData: Order): Promise<Order> {
    try {
      const response = await axios.post(`${BASE_URL}/create-order/`, orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  
  async updateOrder(orderId: string, orderData: Order): Promise<Order> {
    try {
      const response = await axios.put(`${BASE_URL}/order/${orderId}`, orderData);
      return response.data;
    } catch (error) {
      console.error(`Error updating order with ID ${orderId}:`, error);
      throw error;
    }
  }

  
  async deleteOrder(orderId: string): Promise<void> {
    try {
      await axios.delete(`${BASE_URL}/order/${orderId}`);
    } catch (error) {
      console.error(`Error deleting order with ID ${orderId}:`, error);
      throw error;
    }
  }
}
