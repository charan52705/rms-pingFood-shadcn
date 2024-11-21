import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import axios from 'axios';

const USER_ROLE_KEY = 'userRole'; 
const USER_DATA_KEY = 'userData'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private apiurl = environment.baseUrl;
  private userType = '';

  constructor() {
    this.initializeUserRole();
  }

  
  private initializeUserRole(): void {
    const storedRole = localStorage.getItem(USER_ROLE_KEY);
    if (storedRole && (storedRole === 'Admin' || storedRole === 'customer')) {
      this.userRole.next(storedRole); 
    }
  }

  
  async getUserData(email: string): Promise<any> {
    const decodedEmail = decodeURIComponent(email);
    const baseUrl = this.apiurl.endsWith('/') ? this.apiurl.slice(0, -1) : this.apiurl;
    const url = `${baseUrl}/userData/${decodedEmail}`;

    try {
      const response = await axios.get(url, {
        headers: {
          'accept': 'application/json',
        },
      });

      if (response.status === 200 && response.data.role) {
        const { role } = response.data;
        this.userRole.next(role); 
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data)); 
        localStorage.setItem(USER_ROLE_KEY, role); 
        this.login(role); 
        return response.data;
      } else {
        console.error('Failed to fetch user data or role is missing');
        return { success: false, message: 'Error fetching user data.' };
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
    console.error('Error occurred:', error);

    if (error.response) {
      
      console.error('API Response error:', error.response.data);
    } else if (error.request) {
      
      console.error('No response from server:', error.request);
    } else {
      
      console.error('Error setting up the request:', error.message);
    }
  }

  
  login(role: string): void {
    this.userRole.next(role);
    localStorage.setItem(USER_ROLE_KEY, role);
  }

  
  setUserType(userTypes: string): void {
    this.userType = userTypes;
  }

  
  logout(): void {
    this.userRole.next(null);
    localStorage.removeItem(USER_ROLE_KEY);
    localStorage.removeItem(USER_DATA_KEY); 
  }

  
  getRole(): Observable<string | null> {
    return this.userRole.asObservable();
  }

  
  isAdmin(): boolean {
    return this.userRole.getValue() === 'Admin';
  }

  
  isCustomer(): boolean {
    return this.userRole.getValue() === 'customer';
  }

  
  isAuthenticated(): boolean {
    return this.userRole.getValue() !== null;
  }

}
