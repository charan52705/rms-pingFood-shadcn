// auth.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/login'; // Replace with your FastAPI endpoint

  async login(email: string, password: string): Promise<any> {
    try {
      const response = await axios.post(this.apiUrl, { email, password });
      return response.data; // Return token data from backend
    } catch (error) {
      console.error("Login failed", error);
      throw new Error("Login failed");
    }
  }
}
