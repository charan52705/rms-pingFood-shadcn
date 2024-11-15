import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private apiurl = environment.baseUrl;
  private userType = ''

  constructor() {
    const storedRole = localStorage.getItem('userRole');
    this.userRole.next(storedRole); 
  }

  async getUserData(email: string): Promise<any> {
    console.log('Fetching user data for email:', email);
    
    
    const baseUrl = this.apiurl.endsWith('/') ? this.apiurl.slice(0, -1) : this.apiurl;
    const url = `${baseUrl}/userData/${encodeURIComponent(email)}`;
    console.log('API URL:', url);

    try {
      const response = await axios.get(url, {
        headers: {
          'accept': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('User data:', response.data);
        const role = response.data.role;
        this.userRole.next(role);
        this.login(role)
        return response.data;

      } else {
        console.error('Unexpected status code:', response.status);
        return { success: false, message: 'Unexpected error occurred.' };
      }
    } catch (error) {
      this.handleError(error);
      return {
        success: false,
        message: 'An error occurred while fetching user data. Please try again later.',
      };
    }
  }

  private handleError(error: any): void {
    console.error('An error occurred:', error);

    if (error.response) {
      console.error('Response error:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error.request) {
      console.error('Request error:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
  }

  login(role: string): void {
    
    this.userRole.next(role);
    localStorage.setItem('userRole', role);
    console.log('Logged in with role:', role);
  }

  setUserType(userTypes:string) : void {
    this.userType = userTypes
  }

  logout(): void {
    
    this.userRole.next(null);
    localStorage.removeItem('userRole');
  }

  getRole(): Observable<string | null> {
    return this.userRole.asObservable();
  }

  isAdmin(): boolean {
    return this.userRole.getValue() === 'admin';
  }

  isCustomer(): boolean {
    return this.userRole.getValue() === 'customer';
  }

  isAuthenticated(): boolean {
    return this.userRole.getValue() !== null;
  }
}
