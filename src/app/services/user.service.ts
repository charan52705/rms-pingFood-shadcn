import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Define the User interface
export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  address_street: string;
  address_city: string;
  address_state: string;
  address_zip: number;
  user_active: boolean;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8000'; // FastAPI base URL
  private axiosInstance: AxiosInstance;

  constructor() {
    // Initialize Axios instance
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Create a new user
  createUser(user: User): Promise<AxiosResponse<any>> {
    return this.axiosInstance.post('/create-user/', user);
  }

  // Get user by ID
  getUser(userId: number): Promise<AxiosResponse<User>> {
    return this.axiosInstance.get(`/user/${userId}`);
  }

  // Update user by ID
  updateUser(userId: number, user: User): Promise<AxiosResponse<any>> {
    return this.axiosInstance.put(`/user/${userId}`, user);
  }

  // Delete user by ID
  deleteUser(userId: number): Promise<AxiosResponse<any>> {
    return this.axiosInstance.delete(`/user/${userId}`);
  }

  // Get all users
  getAllUsers(): Promise<AxiosResponse<User[]>> {
    return this.axiosInstance.get('/users/');
  }
}
